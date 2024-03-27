"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""
import typing as t

from codeforlife.types import DataDict
from codeforlife.user.models import (
    AnyUser,
    Class,
    IndependentUser,
    Student,
    StudentUser,
    Teacher,
    User,
)
from codeforlife.user.serializers import (
    BaseUserSerializer as _BaseUserSerializer,
)
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from django.conf import settings
from django.contrib.auth.password_validation import (
    validate_password as _validate_password,
)
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.core.exceptions import ValidationError as CoreValidationError
from django.utils import timezone
from rest_framework import serializers

# NOTE: type hint to help Intellisense.
password_reset_token_generator: PasswordResetTokenGenerator = (
    default_token_generator
)


# pylint: disable=missing-class-docstring
# pylint: disable=too-many-ancestors
# pylint: disable=missing-function-docstring


# ------------------------------------------------------------------------------
# Base serializers
# ------------------------------------------------------------------------------


class BaseUserSerializer(_BaseUserSerializer[AnyUser], t.Generic[AnyUser]):
    # TODO: make email unique in new models and remove this validation.
    def validate_email(self, value: str):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "Already exists.", code="already_exists"
            )

        return value

    def validate_password(self, value: str):
        """Validate the new password depending on user type."""
        # If we're creating a new user, we do not yet have the user object.
        # Therefore, we need to create a dummy user and pass it to the password
        # validators so they know what type of user we have.
        user: t.Optional[User] = self.instance
        if not user:
            user = User()

            user_type: str = self.context["user_type"]
            if user_type == "teacher":
                Teacher(new_user=user)
            elif user_type == "student":
                Student(new_user=user)

        try:
            _validate_password(value, user)
        except CoreValidationError as ex:
            raise serializers.ValidationError(ex.messages, ex.code) from ex

        return value

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password is not None:
            instance.set_password(password)

        return super().update(instance, validated_data)


# ------------------------------------------------------------------------------
# Action serializers
# ------------------------------------------------------------------------------


class UserSerializer(BaseUserSerializer[User], _UserSerializer):
    requesting_to_join_class = serializers.CharField(
        source="new_student.pending_class_request",
        required=False,
        allow_null=True,
    )
    current_password = serializers.CharField(
        write_only=True,
        required=False,
    )
    date_of_birth = serializers.DateField(required=False)
    add_to_newsletter = serializers.BooleanField(write_only=True)

    class Meta(_UserSerializer.Meta):
        fields = [
            *_UserSerializer.Meta.fields,
            "password",
            "current_password",
            "date_of_birth",
            "add_to_newsletter",
        ]
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
            "first_name": {"read_only": False},
            "last_name": {
                "read_only": False,
                "required": False,
                "min_length": 1,
            },
            "email": {"read_only": False},
            "password": {"write_only": True, "required": False},
        }

    def validate_requesting_to_join_class(self, value: str):
        # NOTE: Error message is purposefully ambiguous to prevent class
        # enumeration.
        error_message = "Class does not exist or does not accept join requests."

        if value is not None:
            try:
                klass = Class.objects.get(access_code=value)
            except Class.DoesNotExist as ex:
                raise serializers.ValidationError(
                    error_message, code="does_not_exist"
                ) from ex

            if klass.accept_requests_until is None:
                raise serializers.ValidationError(
                    error_message, code="does_not_accept_requests"
                )

            if klass.accept_requests_until < timezone.now():
                raise serializers.ValidationError(
                    error_message, code="no_longer_accepts_requests"
                )

        return value

    def validate_current_password(self, value: str):
        if not self.instance:
            raise serializers.ValidationError(
                "Can only check the password of an existing user.",
                code="user_does_not_exist",
            )
        if not self.instance.check_password(value):
            raise serializers.ValidationError(
                "Does not match the current password.",
                code="does_not_match",
            )

        return value

    def validate(self, attrs):
        if (
            self.instance
            and any(field in attrs for field in self.instance.credential_fields)
            and "current_password" not in attrs
        ):
            raise serializers.ValidationError(
                "Current password is required when updating fields: "
                f"{', '.join(self.instance.credential_fields)}.",
                code="current_password__required",
            )

        return attrs

    def create(self, validated_data):
        user_fields = t.cast(DataDict, validated_data)
        add_to_newsletter = user_fields.pop("add_to_newsletter")

        independent_user = IndependentUser.objects.create_user(**user_fields)
        if add_to_newsletter:
            independent_user.add_contact_to_dot_digital()

        return independent_user

    def update(self, instance, validated_data):
        if "new_student" in validated_data:
            new_student = t.cast(DataDict, validated_data.pop("new_student"))
            if "pending_class_request" in new_student:
                pending_class_request: t.Optional[str] = new_student[
                    "pending_class_request"
                ]
                student = t.cast(IndependentUser, instance).student
                student.pending_class_request = (
                    None
                    if pending_class_request is None
                    else Class.objects.get(access_code=pending_class_request)
                )
                student.save(update_fields=["pending_class_request"])

                # TODO: Send email in signal to indy user confirming successful
                #  join request.
                # TODO: Send email in signal to teacher of selected class to
                #  notify them of join request.

        return super().update(instance, validated_data)


class HandleIndependentUserJoinClassRequestSerializer(
    BaseUserSerializer[IndependentUser]
):
    """
    Handles an independent user's request to join a class. If "accept" is
    True, convert the independent user to a student user and add them to the
    class in question. First name validation is also done to avoid duplicate
    first names within the class (case-insensitive).
    """

    accept = serializers.BooleanField(write_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = [*BaseUserSerializer.Meta.fields, "accept"]
        extra_kwargs = {
            **BaseUserSerializer.Meta.extra_kwargs,
            "first_name": {"min_length": 1, "required": False},
        }

    def validate_first_name(self, value: str):
        if StudentUser.objects.filter(
            new_student__class_field=(
                self.non_none_instance.student.pending_class_request
            ),
            first_name__iexact=value,
        ).exists():
            raise serializers.ValidationError(
                "This name already exists in the class. "
                "Please choose a different name.",
                code="already_in_class",
            )

        return value

    def update(self, instance, validated_data):
        if validated_data["accept"]:
            instance.student.class_field = (
                instance.student.pending_class_request
            )
            instance.student.pending_class_request = None

            instance.student.save(
                update_fields=["class_field", "pending_class_request"]
            )

            instance.username = StudentUser.get_random_username()
            instance.first_name = validated_data.get(
                "first_name", instance.first_name
            )
            instance.last_name = ""
            instance.email = ""

            instance.save(
                update_fields=["username", "first_name", "last_name", "email"]
            )

            # TODO: Send new student user an email notifying them that their
            #  request has been accepted.

        else:
            instance.student.pending_class_request = None
            instance.student.save(update_fields=["pending_class_request"])

            # TODO: Send independent user an email notifying them that their
            #  request has been rejected.

        return instance


class RequestUserPasswordResetSerializer(_UserSerializer):
    class Meta(_UserSerializer.Meta):
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
            "email": {"read_only": False},
        }

    def validate_email(self, value: str):
        try:
            return User.objects.get(email__iexact=value)
        except User.DoesNotExist as ex:
            raise serializers.ValidationError(code="does_not_exist") from ex

    def create(self, validated_data: DataDict):
        user: User = validated_data["email"]

        # Generate reset-password url for the frontend.
        reset_password_url = "/".join(
            [
                settings.SERVICE_BASE_URL,
                "reset-password",
                "teacher" if user.teacher else "independent",  # user type
                str(user.pk),
                password_reset_token_generator.make_token(user),
            ]
        )

        # TODO: Send email to user with URL to reset password.

        return user


class ResetUserPasswordSerializer(BaseUserSerializer[User], _UserSerializer):
    token = serializers.CharField(write_only=True)

    class Meta(_UserSerializer.Meta):
        fields = [*_UserSerializer.Meta.fields, "password", "token"]
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
            "password": {"write_only": True, "required": False},
        }

    def validate_token(self, value: str):
        if not self.instance:
            raise serializers.ValidationError(
                "Can only reset the password of an existing user.",
                code="user_does_not_exist",
            )
        if not password_reset_token_generator.check_token(self.instance, value):
            raise serializers.ValidationError(
                "Does not match the given user.",
                code="does_not_match",
            )

        return value

    def update(self, instance: User, validated_data: DataDict):
        password = validated_data.pop("password", None)
        if password is not None:
            instance.set_password(password)
            instance.save(update_fields=["password"])

        return instance

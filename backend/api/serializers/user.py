"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""
import typing as t

from codeforlife.user.models import (
    AnyUser,
    Class,
    IndependentUser,
    Student,
    StudentUser,
    Teacher,
    User,
    UserProfile,
)
from codeforlife.user.serializers import (
    BaseUserSerializer as _BaseUserSerializer,
)
from codeforlife.user.serializers import StudentSerializer
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from django.contrib.auth.password_validation import (
    validate_password as _validate_password,
)
from django.core.exceptions import ValidationError as CoreValidationError
from django.utils import timezone
from rest_framework import serializers

from .teacher import TeacherSerializer

# pylint: disable=missing-class-docstring
# pylint: disable=too-many-ancestors
# pylint: disable=missing-function-docstring


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


class UserSerializer(BaseUserSerializer[User], _UserSerializer):
    student = StudentSerializer(source="new_student", required=False)
    teacher = TeacherSerializer(source="new_teacher", required=False)
    requesting_to_join_class = serializers.CharField(
        source="new_student.pending_class_request",
        required=False,
        allow_null=True,
    )
    current_password = serializers.CharField(
        write_only=True,
        required=False,
    )

    class Meta(_UserSerializer.Meta):
        fields = [*_UserSerializer.Meta.fields, "password", "current_password"]
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

    def validate(self, attrs):
        if self.instance:  # Updating
            if self.instance.teacher:
                if "new_student" in attrs:
                    raise serializers.ValidationError(
                        "Cannot set student fields for a teacher.",
                        code="student__is_teacher",
                    )

            elif self.instance.student:
                if "new_teacher" in attrs:
                    raise serializers.ValidationError(
                        "Cannot set teacher fields for a student.",
                        code="teacher__is_student",
                    )

                if (
                    self.instance.student.class_field is not None
                    and "new_student" in attrs
                    and "pending_class_request" in attrs["new_student"]
                ):
                    raise serializers.ValidationError(
                        "Student cannot request to join a class.",
                        code="requesting_to_join_class__update__in_class",
                    )

                if (
                    self.instance.student.pending_class_request is not None
                    and "new_student" in attrs
                    and "class_field" in attrs["new_student"]
                ):
                    raise serializers.ValidationError(
                        "Independent user cannot be added to class as they "
                        "are already requesting to join a class.",
                        code="class_field__update__requesting_to_join_class",
                    )

        else:  # Creating
            if "new_teacher" in attrs and "new_student" in attrs:
                raise serializers.ValidationError(
                    "Cannot create a user with both teacher and student "
                    "attributes.",
                    code="teacher_and_student",
                )

            if "new_teacher" in attrs:
                if not attrs.get("last_name"):
                    raise serializers.ValidationError(
                        "Last name is required.", code="last_name__required"
                    )

            elif "new_student" in attrs:
                if (
                    "class_field" in attrs["new_student"]
                    and "pending_class_request" in attrs["new_student"]
                ):
                    raise serializers.ValidationError(
                        "Cannot create a student in class who is also "
                        "requesting to join a class.",
                        code="requesting_to_join_class__create__in_class",
                    )

        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data.get("last_name"),
        )

        user_profile = UserProfile.objects.create(
            user=user,
            is_verified=self.context.get("is_verified", False),
        )

        if "new_teacher" in validated_data:
            Teacher.objects.create(
                user=user_profile,
                new_user=user,
                is_admin=validated_data["new_teacher"]["is_admin"],
                school=self.context.get("school"),
            )
        elif "new_student" in validated_data:
            pass  # TODO

        # TODO: Handle signing new user up to newsletter if checkbox ticked

        return user

    def update(self, instance, validated_data):
        if "new_student" in validated_data:
            student = validated_data.pop("new_student")
            if "pending_class_request" in student:
                pending_class_request = student["pending_class_request"]

                if pending_class_request is None:
                    instance.student.pending_class_request = None
                    instance.student.save(
                        update_fields=["pending_class_request"]
                    )
                else:
                    instance.student.pending_class_request = Class.objects.get(
                        access_code=pending_class_request
                    )
                    instance.student.save(
                        update_fields=["pending_class_request"]
                    )

                    # TODO: Send email to indy user confirming successful join
                    #  request.
                    # TODO: Send email to teacher of selected class to notify
                    #  them of join request.

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

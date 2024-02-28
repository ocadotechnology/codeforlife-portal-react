"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

import typing as t
from itertools import groupby

from codeforlife.serializers import ModelListSerializer
from codeforlife.user.models import (
    Class,
    IndependentUser,
    Student,
    StudentUser,
    Teacher,
    User,
    UserProfile,
)
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from django.contrib.auth.password_validation import (
    validate_password as _validate_password,
)
from django.utils import timezone
from rest_framework import serializers

from .student import StudentSerializer
from .teacher import TeacherSerializer

# pylint: disable=missing-class-docstring,too-many-ancestors


class UserListSerializer(ModelListSerializer[User]):
    def create(self, validated_data):
        classes = {
            klass.access_code: klass
            for klass in Class.objects.filter(
                access_code__in={
                    user_fields["new_student"]["class_field"]["access_code"]
                    for user_fields in validated_data
                }
            )
        }

        # TODO: replace this logic with bulk creates for each object when we
        #   switch to PostgreSQL.
        return [
            StudentUser.objects.create_user(
                first_name=user_fields["first_name"],
                klass=classes[
                    user_fields["new_student"]["class_field"]["access_code"]
                ],
            )
            for user_fields in validated_data
        ]

    def validate(self, attrs):
        super().validate(attrs)

        def get_access_code(user_fields: t.Dict[str, t.Any]):
            return user_fields["new_student"]["class_field"]["access_code"]

        def get_first_name(user_fields: t.Dict[str, t.Any]):
            return user_fields["first_name"]

        attrs.sort(key=get_access_code)
        for access_code, group in groupby(attrs, key=get_access_code):
            # Validate first name is not specified more than once in data.
            data = list(group)
            data.sort(key=get_first_name)
            for first_name, group in groupby(data, key=get_first_name):
                if len(list(group)) > 1:
                    raise serializers.ValidationError(
                        f'First name "{first_name}" is specified more than once'
                        f" in data for class {access_code}.",
                        code="first_name_not_unique_per_class_in_data",
                    )

            # Validate first names are not already taken in class.
            if User.objects.filter(
                first_name__in=list(map(get_first_name, data)),
                new_student__class_field__access_code=access_code,
            ).exists():
                raise serializers.ValidationError(
                    "One or more first names is already taken in class"
                    f" {access_code}.",
                    code="first_name_not_unique_per_class_in_db",
                )

        return attrs


class UserSerializer(_UserSerializer[User]):
    student = StudentSerializer(source="new_student", required=False)
    teacher = TeacherSerializer(source="new_teacher", required=False)
    requesting_to_join_class = serializers.CharField(
        required=False, allow_blank=True
    )
    current_password = serializers.CharField(
        write_only=True,
        required=False,
    )

    class Meta(_UserSerializer.Meta):
        fields = [
            *_UserSerializer.Meta.fields,
            "student",
            "teacher",
            "password",
            "requesting_to_join_class",
            "current_password",
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
        list_serializer_class = UserListSerializer

    def validate(self, attrs):
        if self.instance:  # Updating
            if self.view.action != "reset_password":
                # TODO: make current password required when changing
                #  self-profile.
                pass

            if self.instance.teacher:
                if "last_name" in attrs and not attrs["last_name"]:
                    raise serializers.ValidationError(
                        "Last name is required.", code="last_name_required"
                    )

                if "requesting_to_join_class" in attrs:
                    raise serializers.ValidationError(
                        "Teacher can't request to join a class.",
                        code="teacher_cannot_request_to_join_class",
                    )

            if self.instance.student:
                if self.view.action != "reset_password":
                    if self.request.student_user.pk != self.instance.pk:
                        raise serializers.ValidationError(
                            "Cannot update another student.", code="is_not_self"
                        )

                if (
                    self.instance.student.class_field is not None
                    and "requesting_to_join_class" in attrs
                ) or (
                    self.instance.student.pending_class_request is not None
                    and "new_student" in attrs
                    and "class_field" in attrs["new_student"]
                ):
                    raise serializers.ValidationError(
                        "Student can't be in a class and requesting to join a "
                        "class at the same time.",
                        code="class_and_join_class_mutually_exclusive",
                    )

        else:  # Creating
            if "new_teacher" in attrs:
                if "last_name" not in attrs or attrs["last_name"] is None:
                    raise serializers.ValidationError(
                        "Last name is required.", code="last_name_required"
                    )

                if "requesting_to_join_class" in attrs:
                    raise serializers.ValidationError(
                        "Teacher can't request to join a class.",
                        code="teacher_cannot_request_to_join_class",
                    )

            if "new_student" in attrs:
                if (
                    "class_field" in attrs["new_student"]
                    and "requesting_to_join_class" in attrs
                ):
                    raise serializers.ValidationError(
                        "Student can't be in a class and requesting to join a "
                        "class at the same time.",
                        code="class_and_join_class_mutually_exclusive",
                    )

        return attrs

    def validate_password(self, value: str):
        """Validate the new password depending on user type."""
        # If we're creating a new user, we do not yet have the user object.
        # Therefore, we need to create a dummy user and pass it to the password
        # validators so they know what type of user we have.
        instance = self.instance
        if not instance:
            instance = User()

            user_type: str = self.context["user_type"]
            if user_type == "teacher":
                Teacher(new_user=instance)
            elif user_type == "student":
                Student(new_user=instance)

        _validate_password(value, instance)

        return value

    def validate_requesting_to_join_class(self, value: str):
        # NOTE: Error message is purposefully ambiguous to prevent class
        # enumeration.
        error_message = "Class does not exist or does not accept join requests."
        error_code = "does_not_exist_or_accept_join_requests"

        if value != "":
            try:
                klass = Class.objects.get(access_code=value)
            except Class.DoesNotExist as ex:
                raise serializers.ValidationError(
                    error_message, code=error_code
                ) from ex

            if (
                klass.accept_requests_until is None
                or klass.accept_requests_until < timezone.now()
            ):
                raise serializers.ValidationError(
                    error_message, code=error_code
                )

        return value

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
        requesting_to_join_class = validated_data.get(
            "requesting_to_join_class"
        )
        if requesting_to_join_class is not None:
            # If value is empty, this means independent wants to revoke their
            # join request
            if requesting_to_join_class == "":
                instance.student.pending_class_request = None
            else:
                instance.student.pending_class_request = Class.objects.get(
                    access_code=requesting_to_join_class
                )

            # TODO: Send email to indy user confirming successful join request.
            # TODO: Send email to teacher of selected class to notify them of
            #  join request.

            instance.student.save()

        password = validated_data.get("password")

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance

    def to_representation(self, instance: User):
        representation = super().to_representation(instance)

        # Return student's auto-generated password.
        if (
            representation["student"] is not None
            and self.request.auth_user.teacher is not None
        ):
            # pylint: disable-next=protected-access
            password = instance._password
            if password is not None:
                representation["password"] = password

        return representation


class ReleaseStudentUserListSerializer(ModelListSerializer[StudentUser]):
    def update(self, instance, validated_data):
        for student_user, data in zip(instance, validated_data):
            student_user.student.class_field = None
            student_user.student.save(update_fields=["class_field"])

            student_user.email = data["email"]
            student_user.save(update_fields=["email"])

        return instance


class ReleaseStudentUserSerializer(_UserSerializer[StudentUser]):
    """Convert a student to an independent learner."""

    class Meta(_UserSerializer.Meta):
        extra_kwargs = {
            "first_name": {
                "min_length": 1,
                "read_only": False,
                "required": False,
            },
            "email": {"read_only": False},
        }
        list_serializer_class = ReleaseStudentUserListSerializer

    # pylint: disable-next=missing-function-docstring
    def validate_email(self, value: str):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "Already exists.", code="already_exists"
            )

        return value


class HandleIndependentUserJoinClassRequestSerializer(
    _UserSerializer[IndependentUser]
):
    accept = serializers.BooleanField(write_only=True)

    class Meta(_UserSerializer.Meta):
        fields = [
            *_UserSerializer.Meta.fields,
            "accept",
        ]

        extra_kwargs = {
            "first_name": {
                "min_length": 1,
                "read_only": False,
                "required": False,
            },
        }

    def validate_first_name(self, value: str):
        if Student.objects.filter(
            class_field=self.instance.student.pending_class_request,
            new_user__first_name__iexact=value,
        ).exists():
            raise serializers.ValidationError(
                "This name already exists in the class. "
                "Please choose a different name.",
                code="first_name_in_class",
            )

        return value

    def update(self, instance, validated_data):
        if validated_data["accept"]:
            instance.student.class_field = (
                instance.student.pending_class_request
            )
            instance.student.pending_class_request = None

            instance.username = StudentUser.get_random_username()
            instance.first_name = validated_data.get(
                "first_name", instance.first_name
            )
            instance.last_name = ""
            instance.email = ""

            instance.student.save(
                update_fields=["class_field", "pending_class_request"]
            )
            instance.save(
                update_fields=["username", "first_name", "last_name", "email"]
            )
        else:
            instance.student.pending_class_request = None
            instance.student.save(update_fields=["pending_class_request"])

            # TODO: Send independent user an email notifying them that their
            #  request has been rejected.

        return instance

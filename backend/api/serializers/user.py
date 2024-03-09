"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

import typing as t

from codeforlife.user.models import (
    AnyUser,
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
        """
        Validate the new password depending on user type.
        """

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

    def update(self, instance, validated_data):
        password = validated_data.get("password")

        if password is not None:
            instance.set_password(password)

        instance.save()
        return instance


class UserSerializer(BaseUserSerializer[User], _UserSerializer):
    student = StudentSerializer(source="new_student", required=False)
    teacher = TeacherSerializer(source="new_teacher", required=False)
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

    def validate(self, attrs):
        if self.instance is not None and self.view.action != "reset-password":
            # TODO: make current password required when changing self-profile.
            pass

        if "new_teacher" in attrs and "last_name" not in attrs:
            raise serializers.ValidationError(
                "Last name is required.", code="last_name_required"
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

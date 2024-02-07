"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

import string
import typing as t
from itertools import groupby

from codeforlife.serializers import ModelListSerializer
from codeforlife.user.models import Class, Student, User, UserProfile, Teacher
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import (
    validate_password as _validate_password,
)
from django.utils.crypto import get_random_string
from rest_framework import serializers

from .student import StudentSerializer
from .teacher import TeacherSerializer


# pylint: disable-next=missing-class-docstring
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
        users: t.List[User] = []
        for user_fields in validated_data:
            password = get_random_string(
                length=6,
                allowed_chars=string.ascii_lowercase,
            )

            user = User.objects.create_user(
                first_name=user_fields["first_name"],
                username=get_random_string(length=30),
                password=make_password(password),
            )
            users.append(user)

            # pylint: disable-next=protected-access
            user._password = password

            login_id = None
            while (
                login_id is None
                or Student.objects.filter(login_id=login_id).exists()
            ):
                login_id = get_random_string(length=64)

            Student.objects.create(
                class_field=classes[
                    user_fields["new_student"]["class_field"]["access_code"]
                ],
                user=UserProfile.objects.create(user=user),
                new_user=user,
                login_id=login_id,
            )

        return users

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


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserSerializer(_UserSerializer):
    student = StudentSerializer(source="new_student", required=False)
    teacher = TeacherSerializer(source="new_teacher", required=False)
    current_password = serializers.CharField(
        write_only=True,
        required=False,
    )

    class Meta(_UserSerializer.Meta):
        fields = [
            *_UserSerializer.Meta.fields,
            "password",
            "current_password",
        ]
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
            "first_name": {"read_only": False},
            "password": {"write_only": True, "required": False},
        }
        list_serializer_class = UserListSerializer

    def create(self, validated_data):
        if self.view.action == "accept_invite":
            invitation = self.context["invitation"]

            user = User.objects.create_user(
                username=invitation.invited_teacher_email,
                email=invitation.invited_teacher_email,
                password=validated_data["password"],
                first_name=invitation.invited_teacher_first_name,
                last_name=invitation.invited_teacher_last_name,
            )

            user_profile = UserProfile.objects.create(
                user=user, is_verified=True
            )

            Teacher.objects.create(
                user=user_profile,
                new_user=user,
                is_admin=invitation.invited_teacher_is_admin,
                school=invitation.school,
            )

            # TODO: Handle signing new user up to newsletter if checkbox ticked

            return user

    def validate(self, attrs):
        if self.view.action not in ("reset-password", "invite-teacher",
                                    "accept-invite"):
            pass
            # TODO: make current password required when changing self-profile.

        return attrs

    def validate_password(self, value: str):
        """
        Validate the new password depending on user type.
        :param value: the new password
        """
        _validate_password(
            value,
            self.instance
            if self.instance is not None
            else self.context["user"],
        )
        return value

    def update(self, instance, validated_data):
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
            and self.request_user.teacher is not None
        ):
            # pylint: disable-next=protected-access
            password = instance._password
            if password is not None:
                representation["password"] = password

        return representation

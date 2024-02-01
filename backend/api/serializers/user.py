"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

import string
import typing as t
from itertools import groupby

from codeforlife.serializers import ModelSerializer, ModelListSerializer
from codeforlife.user.auth.password_validators import (
    IndependentPasswordValidator,
    TeacherPasswordValidator,
)
from codeforlife.user.models import Class, Student, User, UserProfile
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from django.contrib.auth.hashers import make_password
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

    def validate(self, attrs):
        # TODO: make current password required when changing self-profile.

        return attrs

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


# pylint: disable-next=missing-class-docstring
class PasswordResetSerializer(ModelSerializer[User]):
    class Meta:
        model = User
        fields = ["password"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, value: str):
        """
        Validate the new password depending on user type.
        :param value: the new password
        """
        user = getattr(self, "instance", None)
        validator = (
            TeacherPasswordValidator
            if hasattr(user, "teacher")
            else IndependentPasswordValidator
        )()

        validator.validate(value, user)
        return value

    def update(self, instance, validated_data):
        instance.set_password(validated_data["password"])
        instance.save()
        return instance

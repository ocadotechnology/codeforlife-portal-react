"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

import string
import typing as t

from codeforlife.serializers import ModelListSerializer
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
                # last_name="",
                # email="",
                username=get_random_string(length=30),
                password=make_password(password),
            )
            users.append(user)

            # pylint: disable-next=protected-access
            user._password = password

            # TODO: Is this needed?
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


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserSerializer(_UserSerializer):
    student = StudentSerializer(source="new_student", required=False)

    teacher = TeacherSerializer(source="new_teacher", required=False)

    current_password = serializers.CharField(write_only=True, required=False)

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

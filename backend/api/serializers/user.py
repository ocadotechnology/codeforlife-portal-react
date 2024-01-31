"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

from codeforlife.serializers import ModelSerializer
from codeforlife.user.auth.password_validators import (
    IndependentPasswordValidator,
    TeacherPasswordValidator,
)
from codeforlife.user.models import User
from codeforlife.user.serializers import UserSerializer as _UserSerializer
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring
class UserSerializer(_UserSerializer):
    current_password = serializers.CharField(write_only=True)

    class Meta(_UserSerializer.Meta):
        fields = [
            *_UserSerializer.Meta.fields,
            "current_password",
        ]


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

"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

from codeforlife.user.serializers import UserSerializer as _UserSerializer
from rest_framework import serializers


class UserSerializer(_UserSerializer):
    current_password = serializers.CharField(write_only=True)

    class Meta(_UserSerializer.Meta):
        fields = [
            "id",
            "password",
            "first_name",
            "last_name",
            "email",
        ]
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
        }

    def update(self, instance, validated_data):
        email = validated_data.get("email")
        if email is not None:
            instance.username = email

        return super().update(instance, validated_data)

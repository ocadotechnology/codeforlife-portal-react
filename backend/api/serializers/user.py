"""
© Ocado Group
Created on 18/01/2024 at 15:14:32(+00:00).
"""

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

    def update(self, instance, validated_data):
        email = validated_data.get("email")
        if email is not None:
            instance.username = email

        return super().update(instance, validated_data)

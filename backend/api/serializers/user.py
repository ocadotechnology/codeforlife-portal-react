from codeforlife.user.serializers import UserSerializer as _UserSerializer
from rest_framework import serializers


class UserSerializer(_UserSerializer):
    current_password = serializers.CharField(write_only=True)

    class Meta(_UserSerializer.Meta):
        extra_kwargs = {
            **_UserSerializer.Meta.extra_kwargs,
            "username": {"read_only": True},
            "isActive": {"read_only": True},
            "isStaff": {"read_only": True},
            "dateJoined": {"read_only": True},
            "lastLogin": {"read_only": True},
        }

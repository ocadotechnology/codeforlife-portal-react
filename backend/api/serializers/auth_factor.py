"""
© Ocado Group
Created on 23/01/2024 at 11:05:37(+00:00).
"""

from codeforlife.request import Request
from codeforlife.serializers import ModelSerializer
from codeforlife.user.models import AuthFactor


# pylint: disable-next=missing-class-docstring
class AuthFactorSerializer(ModelSerializer[AuthFactor]):
    class Meta:
        model = AuthFactor
        fields = [
            "id",
            "type",
        ]
        extra_kwargs = {
            "id": {"read_only": True},
        }

    def create(self, validated_data):
        request: Request = self.context["request"]
        validated_data["user"] = request.user
        return super().create(validated_data)

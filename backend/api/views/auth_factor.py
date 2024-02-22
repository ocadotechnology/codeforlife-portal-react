"""
© Ocado Group
Created on 23/01/2024 at 11:04:44(+00:00).
"""

from codeforlife.permissions import AllowNone
from codeforlife.user.models import AuthFactor
from codeforlife.user.permissions import IsTeacher
from codeforlife.views import ModelViewSet

from ..serializers import AuthFactorSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class AuthFactorViewSet(ModelViewSet[AuthFactor]):
    http_method_names = ["get", "post", "delete"]
    serializer_class = AuthFactorSerializer

    def get_queryset(self):
        return AuthFactor.objects.filter(user=self.request.user)

    def get_permissions(self):
        if self.action in ["retrieve", "bulk"]:
            return [AllowNone()]

        return [IsTeacher()]

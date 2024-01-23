"""
© Ocado Group
Created on 23/01/2024 at 11:04:44(+00:00).
"""

from codeforlife.permissions import AllowNone
from codeforlife.user.models import AuthFactor, User
from rest_framework.viewsets import ModelViewSet

from ..serializers import AuthFactorSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class AuthFactorViewSet(ModelViewSet):
    http_method_names = ["get", "post", "delete"]
    serializer_class = AuthFactorSerializer
    # permission_classes =  [IsAuthenticated, ListOnly] TODO

    def get_queryset(self):
        user: User = self.request.user  # type: ignore[assignment]
        return AuthFactor.objects.filter(user=user)

    def get_permissions(self):
        if self.action == "retrieve":
            return [AllowNone()]

        return super().get_permissions()

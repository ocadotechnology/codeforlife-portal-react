import typing as t

from codeforlife.user.models import User
from codeforlife.user.views import UserViewSet as _UserViewSet
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers import UserSerializer


class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def is_unique_email(self, request):
        """Checks if an email is unique."""

        email: t.Optional[str] = request.data.get("email")
        return Response(
            email and not User.objects.filter(email__iexact=email).exists()
        )

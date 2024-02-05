"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

from codeforlife.user.permissions import IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet

from ..serializers import UserSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "bulk":
            return [IsTeacher()]

        return super().get_permissions()

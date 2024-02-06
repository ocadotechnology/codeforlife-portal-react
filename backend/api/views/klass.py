"""
© Ocado Group
Created on 23/01/2024 at 17:53:37(+00:00).
"""

from codeforlife.permissions import AllowNone
from codeforlife.user.permissions import InSchool, IsTeacher
from codeforlife.user.views import ClassViewSet as _ClassViewSet

from ..serializers import ClassSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class ClassViewSet(_ClassViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = ClassSerializer

    def get_permissions(self):
        # Bulk actions not allowed for classes.
        if self.action == "bulk":
            return [AllowNone()]
        if self.action in ["create", "update", "destroy"]:
            return [IsTeacher(), InSchool()]

        return super().get_permissions()

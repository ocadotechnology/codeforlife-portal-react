"""
© Ocado Group
Created on 09/02/2024 at 16:14:00(+00:00).
"""

from codeforlife.permissions import AllowNone
from codeforlife.user.permissions import InSchool, IsTeacher
from codeforlife.views import ModelViewSet

from ..models import SchoolTeacherInvitation
from ..serializers import SchoolTeacherInvitationSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class SchoolTeacherInvitationViewSet(ModelViewSet[SchoolTeacherInvitation]):
    http_method_names = ["get", "post", "patch", "delete", "list"]
    serializer_class = SchoolTeacherInvitationSerializer

    def get_permissions(self):
        if self.action in ["retrieve", "create", "update", "destroy", "list"]:
            return [IsTeacher(is_admin=True), InSchool()]
        if self.action == "bulk":
            return [AllowNone()]

        return super().get_permissions()

"""
© Ocado Group
Created on 23/01/2024 at 17:53:50(+00:00).
"""

import typing as t

from codeforlife.permissions import NOT, AllowNone, Permission
from codeforlife.user.permissions import InSchool, IsTeacher
from codeforlife.user.views import SchoolViewSet as _SchoolViewSet

from ..serializers import SchoolSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class SchoolViewSet(_SchoolViewSet):
    http_method_names = ["get", "post", "patch"]
    serializer_class = SchoolSerializer

    def get_permissions(self):
        # Bulk actions not allowed for schools.
        if self.action in ["bulk", "list"]:
            return [AllowNone()]
        # Only teachers not in a school can create a school.
        if self.action == "create":
            return [IsTeacher(), NOT(InSchool())]
        # Only admin-teachers in a school can update a school.
        if self.action == "update":
            return [IsTeacher(is_admin=True), InSchool()]

        return [InSchool()]

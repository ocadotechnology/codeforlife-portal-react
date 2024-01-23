"""
© Ocado Group
Created on 23/01/2024 at 17:53:50(+00:00).
"""

from codeforlife.user.views import SchoolViewSet as _SchoolViewSet

from ..serializers import SchoolSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class SchoolViewSet(_SchoolViewSet):
    http_method_names = ["get", "post", "patch"]
    serializer_class = SchoolSerializer

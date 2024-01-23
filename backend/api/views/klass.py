"""
© Ocado Group
Created on 23/01/2024 at 17:53:37(+00:00).
"""

from codeforlife.user.views import ClassViewSet as _ClassViewSet

from ..serializers import ClassSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class ClassViewSet(_ClassViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = ClassSerializer

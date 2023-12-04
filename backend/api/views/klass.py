from codeforlife.user.views import ClassViewSet as _ClassViewSet

from ..serializers import ClassSerializer


class ClassViewSet(_ClassViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = ClassSerializer

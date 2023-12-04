from codeforlife.user.views import UserViewSet as _UserViewSet

from ..serializers import UserSerializer


class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

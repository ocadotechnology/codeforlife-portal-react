"""
© Ocado Group
Created on 18/01/2024 at 10:27:54(+00:00).
"""

from rest_framework.routers import DefaultRouter

from .views import ClassViewSet, SchoolViewSet, UserViewSet

router = DefaultRouter()
router.register(
    "classes",
    ClassViewSet,
    basename="class",
)
router.register(
    "schools",
    SchoolViewSet,
    basename="school",
)
router.register(
    "users",
    UserViewSet,
    basename="user",
)

urlpatterns = router.urls

"""
© Ocado Group
Created on 18/01/2024 at 10:27:54(+00:00).
"""

from rest_framework.routers import DefaultRouter

from .views import (
    AuthFactorViewSet,
    ClassViewSet,
    OtpBypassTokenViewSet,
    SchoolTeacherInvitationViewSet,
    SchoolViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register(
    "auth-factors",
    AuthFactorViewSet,
    basename="auth-factor",
)
router.register(
    "classes",
    ClassViewSet,
    basename="class",
)
router.register(
    "otp-bypass-tokens",
    OtpBypassTokenViewSet,
    basename="otp-bypass-token",
)
router.register(
    "schools/teacher-invitations",
    SchoolTeacherInvitationViewSet,
    basename="school-teacher-invitation",
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

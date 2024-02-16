"""
© Ocado Group
Created on 23/01/2024 at 11:22:16(+00:00).
"""

from codeforlife.permissions import AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import AuthFactor, TeacherUser
from codeforlife.user.permissions import IsTeacher

from ...views import AuthFactorViewSet


# pylint: disable-next=missing-class-docstring
class TestAuthFactorViewSet(ModelViewSetTestCase[AuthFactor]):
    basename = "auth-factor"
    model_view_set_class = AuthFactorViewSet
    fixtures = ["school_2", "non_school_teacher"]

    def setUp(self):
        self.multi_auth_factor_teacher_user = TeacherUser.objects.get(
            email="teacher@school2.com"
        )
        assert self.multi_auth_factor_teacher_user.auth_factors.exists()

        self.uni_auth_factor_teacher_user = TeacherUser.objects.get(
            email="teacher@noschool.com"
        )
        assert not self.uni_auth_factor_teacher_user.auth_factors.exists()

    # test: get queryset

    def test_get_queryset(self):
        """Can only access your own auth factors."""
        request = self.client.request_factory.get(
            user=self.multi_auth_factor_teacher_user
        )

        self.assert_get_queryset(
            list(self.multi_auth_factor_teacher_user.auth_factors.all()),
            request=request,
        )

    # test: get permissions

    def test_get_permissions__bulk(self):
        """Cannot perform any bulk action."""
        self.assert_get_permissions([AllowNone()], action="bulk")

    def test_get_permissions__retrieve(self):
        """Cannot retrieve a single auth factor."""
        self.assert_get_permissions([AllowNone()], action="retrieve")

    def test_get_permissions__list(self):
        """Only a teacher-user can list all auth factors."""
        self.assert_get_permissions([IsTeacher()], action="list")

    def test_get_permissions__create(self):
        """Only a teacher-user can enable an auth factor."""
        self.assert_get_permissions([IsTeacher()], action="create")

    def test_get_permissions__destroy(self):
        """Only a teacher-user can disable an auth factor."""
        self.assert_get_permissions([IsTeacher()], action="destroy")

    # test: generic actions

    def test_list(self):
        """Can list enabled auth-factors."""
        self.client.login_as(self.multi_auth_factor_teacher_user)

        self.client.list(
            list(self.multi_auth_factor_teacher_user.auth_factors.all())
        )

    def test_create__otp(self):
        """Can enable OTP."""
        self.client.login_as(self.uni_auth_factor_teacher_user)

        self.client.create({"type": "otp"})

    def test_destroy(self):
        """Can disable an auth-factor."""
        self.client.login_as(self.multi_auth_factor_teacher_user)

        auth_factor = self.multi_auth_factor_teacher_user.auth_factors.first()
        assert auth_factor

        self.client.destroy(auth_factor)

"""
© Ocado Group
Created on 23/01/2024 at 11:22:16(+00:00).
"""

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import AuthFactor, User, UserProfile
from rest_framework import status

from ...views import AuthFactorViewSet


# pylint: disable-next=missing-class-docstring
class TestAuthFactorViewSet(ModelViewSetTestCase[AuthFactor]):
    basename = "auth-factor"
    model_view_set_class = AuthFactorViewSet

    def setUp(self):
        self.one_factor_credentials = {
            "email": "one.factor@codeforlife.com",
            "password": "password",
        }
        self.one_factor_user = User.objects.create_user(
            first_name="One",
            last_name="Factor",
            username=self.one_factor_credentials["email"],
            **self.one_factor_credentials,
        )
        UserProfile.objects.create(user=self.one_factor_user)

        self.two_factor_credentials = {
            "email": "two.factor@codeforlife.com",
            "password": "password",
        }
        self.two_factor_user = User.objects.create_user(
            first_name="Two",
            last_name="Factor",
            username=self.two_factor_credentials["email"],
            **self.two_factor_credentials,
        )
        UserProfile.objects.create(user=self.two_factor_user)
        self.two_auth_factor = AuthFactor.objects.create(
            user=self.two_factor_user,
            type=AuthFactor.Type.OTP,
        )

    def test_retrieve(self):
        """
        Retrieving a single auth factor is forbidden.
        """

        user = self.client.login(**self.two_factor_credentials)
        assert user == self.two_factor_user

        self.client.retrieve(self.two_auth_factor, status.HTTP_403_FORBIDDEN)

    def test_list(self):
        """
        Can list enabled auth-factors.
        """

        user = self.client.login(**self.two_factor_credentials)
        assert user == self.two_factor_user

        # Need to have another two auth-factor user to ensure some data is
        # filtered out.
        AuthFactor.objects.create(
            user=self.one_factor_user,
            type=AuthFactor.Type.OTP,
        )

        self.client.list([self.two_auth_factor])

    def test_create(self):
        """
        Can enable an auth-factor.
        """

        user = self.client.login(**self.one_factor_credentials)
        assert user == self.one_factor_user

        self.client.create({"type": "otp"})

    def test_destroy(self):
        """
        Can disable an auth-factor.
        """

        user = self.client.login(**self.two_factor_credentials)
        assert user == self.two_factor_user

        self.client.destroy(self.two_auth_factor)

"""
© Ocado Group
Created on 15/02/2024 at 15:44:25(+00:00).
"""

from unittest.mock import patch

import pyotp
from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import AuthFactor, TeacherUser

from ...serializers import AuthFactorSerializer
from ...views import AuthFactorViewSet


# pylint: disable-next=missing-class-docstring
class TestAuthFactorSerializer(ModelSerializerTestCase[AuthFactor]):
    model_serializer_class = AuthFactorSerializer
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

    # test: validate

    def test_validate_type__already_exists(self):
        """Cannot enable an already enabled auth factor."""
        auth_factor = self.multi_auth_factor_teacher_user.auth_factors.first()
        assert auth_factor

        self.assert_validate_field(
            "type",
            auth_factor.type,
            error_code="already_exists",
            context={
                "request": self.request_factory.post(
                    user=self.multi_auth_factor_teacher_user
                )
            },
        )

    # test: create

    def test_create(self):
        """Enabling OTP will ensure the user's OTP-secret is set."""
        assert not self.uni_auth_factor_teacher_user.otp_secret

        otp_secret = pyotp.random_base32()
        with patch.object(pyotp, "random_base32", return_value=otp_secret):
            self.assert_create(
                validated_data={"type": AuthFactor.Type.OTP},
                context={
                    "request": self.request_factory.post(
                        user=self.uni_auth_factor_teacher_user
                    )
                },
                new_data={
                    "user": {
                        "id": self.uni_auth_factor_teacher_user.id,
                        "userprofile": {"otp_secret": otp_secret},
                    },
                },
            )

    # test: to representation

    def test_to_representation(self):
        """User's TOTP provisioning URI is returned when enabling OTP."""
        assert self.multi_auth_factor_teacher_user.otp_secret

        self.assert_to_representation(
            instance=AuthFactor(type=AuthFactor.Type.OTP),
            new_data={
                "totp_provisioning_uri": (
                    self.multi_auth_factor_teacher_user.totp_provisioning_uri
                ),
            },
            context={
                "view": AuthFactorViewSet(action="create"),
                "request": self.request_factory.post(
                    user=self.multi_auth_factor_teacher_user
                ),
            },
        )

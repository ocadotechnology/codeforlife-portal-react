"""
© Ocado Group
Created on 31/01/2024 at 16:07:32(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, Student, User

from ...serializers.user import BaseUserSerializer, UserSerializer

# pylint: disable=missing-class-docstring


class TestBaseUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = BaseUserSerializer[User]
    fixtures = ["school_1"]

    def test_validate_email__already_exists(self):
        """Cannot assign a user an email that already exists."""
        user_fields = User.objects.values("email").first()
        assert user_fields

        self.assert_validate_field(
            "email", user_fields["email"], error_code="already_exists"
        )

    def test_validate_password(self):
        """
        Password is validated using django's installed password-validators.
        """
        raise NotImplementedError()  # TODO

    def test_update(self):
        """Updating a user's password saves the password's hash."""
        raise NotImplementedError()  # TODO


class TestUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = UserSerializer
    fixtures = ["school_1"]

    def test_validate(self):
        """Current password is required when editing a user's data."""
        raise NotImplementedError()  # TODO

    def test_create(self):
        """Can successfully create an independent user."""
        raise NotImplementedError()  # TODO

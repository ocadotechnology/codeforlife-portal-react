from codeforlife.user.models import User
from django.test import TestCase


class TestUser(TestCase):
    def test_pre_save__email(self):
        """
        Updating the email field also updates the username field.
        """

        user = User.objects.first()
        assert user is not None

        email = "example@codeforelife.com"
        assert user.username != email

        user.email = email
        user.save()
        assert user.username == email

        # TODO: assert verification email is sent.

from datetime import timedelta
from unittest.mock import ANY, Mock, patch

from common.models import UserProfile
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone

from . import CronTestCase
from ....emails import NOTIFICATION_EMAIL


class TestUser(CronTestCase):
    # TODO: use fixtures
    def setUp(self):
        self.user = User.objects.create_user(
            username="johndoe",
            email="john.doe@codeforlife.com",
            password="password",
            first_name="John",
            last_name="Doe",
        )
        self.user_profile = UserProfile.objects.create(user=self.user)

    @patch("portal.emails.send_email")
    def test_first_verify_email_reminder_view(self, send_email: Mock):
        self.user.date_joined = timezone.now() - timedelta(days=7, hours=12)
        self.user.save()

        self.client.get(reverse("first-verify-email-reminder"))

        send_email.assert_called_once_with(
            sender=NOTIFICATION_EMAIL,
            recipients=[self.user.email],
            subject=ANY,
            title=ANY,
            text_content=ANY,
        )

    @patch("portal.emails.send_email")
    def test_second_verify_email_reminder_view(self, send_email: Mock):
        self.user.date_joined = timezone.now() - timedelta(days=14, hours=12)
        self.user.save()

        self.client.get(reverse("second-verify-email-reminder"))

        send_email.assert_called_once_with(
            sender=NOTIFICATION_EMAIL,
            recipients=[self.user.email],
            subject=ANY,
            title=ANY,
            text_content=ANY,
        )

    def test_delete_unverified_accounts_view(self):
        self.user.date_joined = timezone.now() - timedelta(days=19, hours=12)
        self.user.save()

        self.client.get(reverse("delete-unverified-accounts"))

        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=self.user.id)

from datetime import timedelta
from unittest.mock import ANY, Mock, patch

from common.helpers.emails import NOTIFICATION_EMAIL
from django.contrib.auth.models import User
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone


class TestUser(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = Client()
        return super().setUpClass()

    @patch("common.helpers.emails.send_email")
    def test_first_verify_email_reminder_view(self, send_email: Mock):
        user = User.objects.get(id=1)
        user.date_joined = timezone.now() - timedelta(days=7, hours=12)
        user.userprofile.is_verified = False
        user.save()

        self.client.get(reverse("first-verify-email-reminder"))

        send_email.assert_called_once_with(
            sender=NOTIFICATION_EMAIL,
            recipients=[user.email],
            subject=ANY,
            title=ANY,
            text_content=ANY,
        )

    @patch("common.helpers.emails.send_email")
    def test_second_verify_email_reminder_view(self, send_email: Mock):
        user = User.objects.get(id=1)
        user.date_joined = timezone.now() - timedelta(days=14, hours=12)
        user.userprofile.is_verified = False
        user.save()

        self.client.get(reverse("second-verify-email-reminder"))

        send_email.assert_called_once_with(
            sender=NOTIFICATION_EMAIL,
            recipients=[user.email],
            subject=ANY,
            title=ANY,
            text_content=ANY,
        )

    def test_delete_unverified_accounts_view(self):
        user = User.objects.get(id=1)
        user.date_joined = timezone.now() - timedelta(days=19, hours=12)
        user.userprofile.is_verified = False
        user.save()

        self.client.get(reverse("delete-unverified-accounts"))

        with self.assertRaises(User.DoesNotExist):
            User.objects.get(id=user.id)

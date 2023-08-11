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

    def send_verify_email_reminder(
        self,
        days: int,
        is_verified: bool,
        view_name: str,
        send_email: Mock,
        assert_called: bool,
    ):
        self.user.date_joined = timezone.now() - timedelta(days=days, hours=12)
        self.user.save()
        self.user_profile.is_verified = is_verified
        self.user_profile.save()

        self.client.get(reverse(view_name))

        if assert_called:
            send_email.assert_called_once_with(
                sender=NOTIFICATION_EMAIL,
                recipients=[self.user.email],
                subject=ANY,
                title=ANY,
                text_content=ANY,
            )
        else:
            send_email.assert_not_called()
        send_email.reset_mock()

    @patch("portal.emails.send_email")
    def test_first_verify_email_reminder_view(self, send_email: Mock):
        self.send_verify_email_reminder(
            days=6,
            is_verified=False,
            view_name="first-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )
        self.send_verify_email_reminder(
            days=7,
            is_verified=False,
            view_name="first-verify-email-reminder",
            send_email=send_email,
            assert_called=True,
        )
        self.send_verify_email_reminder(
            days=7,
            is_verified=True,
            view_name="first-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )
        self.send_verify_email_reminder(
            days=8,
            is_verified=False,
            view_name="first-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )

    @patch("portal.emails.send_email")
    def test_second_verify_email_reminder_view(self, send_email: Mock):
        self.send_verify_email_reminder(
            days=13,
            is_verified=False,
            view_name="second-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )
        self.send_verify_email_reminder(
            days=14,
            is_verified=False,
            view_name="second-verify-email-reminder",
            send_email=send_email,
            assert_called=True,
        )
        self.send_verify_email_reminder(
            days=14,
            is_verified=True,
            view_name="second-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )
        self.send_verify_email_reminder(
            days=15,
            is_verified=False,
            view_name="second-verify-email-reminder",
            send_email=send_email,
            assert_called=False,
        )

    def test_delete_unverified_accounts_view(self):
        def delete_unverified_users(
            days: int,
            is_verified: bool,
            assert_exists: bool,
        ):
            self.user.date_joined = timezone.now() - timedelta(
                days=days, hours=12
            )
            self.user.save()
            self.user_profile.is_verified = is_verified

            self.client.get(reverse("delete-unverified-accounts"))

            (self.assertTrue if assert_exists else self.assertFalse)(
                User.objects.filter(id=self.user.id).exists()
            )

        delete_unverified_users(
            days=18,
            is_verified=False,
            assert_exists=True,
        )
        delete_unverified_users(
            days=19,
            is_verified=False,
            assert_exists=False,
        )
        delete_unverified_users(
            days=19,
            is_verified=True,
            assert_exists=True,
        )
        delete_unverified_users(
            days=20,
            is_verified=False,
            assert_exists=True,
        )

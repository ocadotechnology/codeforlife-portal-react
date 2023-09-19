import logging
from datetime import timedelta

from codeforlife.mixins import CronMixin
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.query import QuerySet
from django.urls import reverse
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from ...emails import NOTIFICATION_EMAIL, generate_token_for_email, send_email

# TODO: move email templates to DotDigital.
USER_1ST_VERIFY_EMAIL_REMINDER_DAYS = 7
USER_1ST_VERIFY_EMAIL_REMINDER_TEXT = (
    "Please go to the link below to verify your email address:"
    "\n{email_verification_url}."
    "\nYou will not be able to use your account until it is verified."
    "\n\nBy activating the account you confirm that you have read and agreed to"
    " our terms ({terms_url}) and our privacy notice ({privacy_notice_url}). If"
    " your account is not verified within 12 days we will delete it."
)
USER_2ND_VERIFY_EMAIL_REMINDER_DAYS = 14
USER_2ND_VERIFY_EMAIL_REMINDER_TEXT = (
    "Please go to the link below to verify your email address:"
    "\n{email_verification_url}."
    "\nYou will not be able to use your account until it is verified."
    "\n\nBy activating the account you confirm that you have read and agreed to"
    " our terms ({terms_url}) and our privacy notice ({privacy_notice_url}). If"
    " your account is not verified within 5 days we will delete it."
)
USER_DELETE_UNVERIFIED_ACCOUNT_DAYS = 19


def get_unverified_users(days: int, same_day: bool) -> QuerySet[User]:
    now = timezone.now()

    # All expired unverified users.
    user_queryset = User.objects.filter(
        date_joined__lte=now - timedelta(days=days),
        userprofile__is_verified=False,
    )
    if same_day:
        user_queryset = user_queryset.filter(
            date_joined__gt=now - timedelta(days=days + 1)
        )

    teacher_queryset = user_queryset.filter(
        new_teacher__isnull=False,
        new_student__isnull=True,
    )
    independent_student_queryset = user_queryset.filter(
        new_teacher__isnull=True,
        new_student__class_field__isnull=True,
    )

    return teacher_queryset.union(independent_student_queryset)


def build_absolute_google_uri(request, location: str) -> str:
    """
    This is needed specifically for emails sent by cron jobs as the protocol for cron jobs is HTTP
    and the service name is wrongly parsed.
    """
    url = request.build_absolute_uri(location)
    url = url.replace("http", "https")
    url = url.replace(".decent", "-dot-decent")

    return url


class FirstVerifyEmailReminderView(CronMixin, APIView):
    def get(self, request):
        user_queryset = get_unverified_users(
            USER_1ST_VERIFY_EMAIL_REMINDER_DAYS,
            same_day=True,
        )
        user_count = user_queryset.count()

        logging.info(f"{user_count} emails unverified.")

        if user_count > 0:
            sent_email_count = 0
            for email in user_queryset.values_list("email", flat=True).iterator(
                chunk_size=500
            ):
                email_verification_url = build_absolute_google_uri(
                    request,
                    reverse(
                        "verify_email",
                        kwargs={"token": generate_token_for_email(email)},
                    ),
                )

                try:
                    send_email(
                        sender=NOTIFICATION_EMAIL,
                        recipients=[email],
                        subject="Awaiting verification",
                        title="Awaiting verification",
                        text_content=USER_1ST_VERIFY_EMAIL_REMINDER_TEXT.format(
                            email_verification_url=email_verification_url,
                            terms_url=f"{settings.FRONTEND_URL}/terms-of-use/terms-of-use",
                            privacy_notice_url=f"{settings.FRONTEND_URL}/privacy-notice/privacy-notice",
                        ),
                        replace_url={"verify_url": email_verification_url},
                    )

                    sent_email_count += 1
                except Exception as ex:
                    logging.exception(ex)

            logging.info(f"Sent {sent_email_count}/{user_count} emails.")

        return Response()


class SecondVerifyEmailReminderView(CronMixin, APIView):
    def get(self, request):
        user_queryset = get_unverified_users(
            USER_2ND_VERIFY_EMAIL_REMINDER_DAYS,
            same_day=True,
        )
        user_count = user_queryset.count()

        logging.info(f"{user_count} emails unverified.")

        if user_count > 0:
            sent_email_count = 0
            for email in user_queryset.values_list("email", flat=True).iterator(
                chunk_size=500
            ):
                email_verification_url = build_absolute_google_uri(
                    request,
                    reverse(
                        "verify_email",
                        kwargs={"token": generate_token_for_email(email)},
                    ),
                )

                try:
                    send_email(
                        sender=NOTIFICATION_EMAIL,
                        recipients=[email],
                        subject="Your account needs verification",
                        title="Your account needs verification",
                        text_content=USER_2ND_VERIFY_EMAIL_REMINDER_TEXT.format(
                            email_verification_url=email_verification_url,
                            terms_url=f"{settings.FRONTEND_URL}/terms-of-use/terms-of-use",
                            privacy_notice_url=f"{settings.FRONTEND_URL}/privacy-notice/privacy-notice",
                        ),
                        replace_url={"verify_url": email_verification_url},
                    )

                    sent_email_count += 1
                except Exception as ex:
                    logging.exception(ex)

            logging.info(f"Sent {sent_email_count}/{user_count} emails.")

        return Response()


class DeleteUnverifiedAccounts(CronMixin, APIView):
    def get(self, request):
        user_count = User.objects.count()

        user_queryset = get_unverified_users(
            USER_DELETE_UNVERIFIED_ACCOUNT_DAYS,
            same_day=False,
        )

        for user in user_queryset.iterator(chunk_size=100):
            try:
                user.delete()
            except Exception as ex:
                logging.error(f"Failed to delete user with id: {user.id}")
                logging.exception(ex)

        user_count -= User.objects.count()
        logging.info(f"{user_count} unverified users deleted.")

        return Response()

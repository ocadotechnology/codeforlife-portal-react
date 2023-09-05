from django.urls import path, include

from ..views.cron import (
    session,
    user,
)


urlpatterns = [
    path(
        "session/",
        include(
            [
                path(
                    "clear-expired/",
                    session.ClearExpiredView.as_view(),
                    name="clear-expired-sessions",
                ),
            ]
        ),
    ),
    path(
        "user/",
        include(
            [
                path(
                    "unverified/send-first-reminder/",
                    user.FirstVerifyEmailReminderView.as_view(),
                    name="first-verify-email-reminder",
                ),
                path(
                    "unverified/send-second-reminder/",
                    user.SecondVerifyEmailReminderView.as_view(),
                    name="second-verify-email-reminder",
                ),
                path(
                    "unverified/delete/",
                    user.DeleteUnverifiedAccounts.as_view(),
                    name="delete-unverified-accounts",
                ),
            ]
        ),
    ),
]

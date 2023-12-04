from django.urls import path, include

from ..views.cron import (
    user,
)


urlpatterns = [
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

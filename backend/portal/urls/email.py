from django.urls import path, re_path

from ..views.email import (
    verify_email,
    send_new_users_report,
)
from portal.helpers.regexes import JWT_REGEX

urlpatterns = [  
    re_path(
        # TODO: modify urls in the verification email
        rf"^verify_email/(?P<token>{JWT_REGEX})/$",
        verify_email,
        name="verify_email",
    ),
    path(
        "mail/weekly/",
        send_new_users_report,
        name="send_new_users_report",
    ),
]

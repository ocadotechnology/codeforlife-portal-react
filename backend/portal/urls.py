from django.conf.urls import url

from portal.views.views import render_react
from portal.views.dotmailer import dotmailer_consent_form, process_newsletter_form
from .views import registration

urlpatterns = [
    url(r"^api/news_signup/$", process_newsletter_form, name="process_newsletter_form"),
    url(r"^api/consent_form/$", dotmailer_consent_form, name="consent_form"),
    url(
        r"^user/password/reset/student/$",
        registration.student_password_reset,
        name="student_password_reset",
    ),
    url(
        r"^user/password/reset/teacher/$",
        registration.teacher_password_reset,
        name="teacher_password_reset",
    ),
    url(
        r"^user/password/reset/done/$",
        registration.password_reset_done,
        name="reset_password_email_sent",
    ),
    url(
        r"^user/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$",
        registration.password_reset_check_and_confirm,
        name="password_reset_check_and_confirm",
    ),
    url(
        r"^delete/account/$",
        registration.delete_account,
        name="delete_account",
    ),
    url(r".*", render_react, name="react_app"),
]

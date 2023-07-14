from django.conf.urls import url

from portal.views.views import render_react
from portal.views.dotmailer import dotmailer_consent_form, process_newsletter_form
from portal.views.email import verify_email, send_new_users_report
from portal.helpers.regexes import JWT_REGEX

urlpatterns = [
    # TODO: modify urls in the verification email
    url(rf"^api/verify_email/(?P<token>{JWT_REGEX})/$", verify_email, name="verify_email"),
    url(r"^api/mail/weekly/$", send_new_users_report, name="send_new_users_report"),
    url(r"^api/news_signup/$", process_newsletter_form, name="process_newsletter_form"),
    url(r"^api/consent_form/$", dotmailer_consent_form, name="consent_form"),
    url(r".*", render_react, name="react_app"),
]

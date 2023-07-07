from django.conf.urls import url

from portal.views.views import render_react
from portal.views.dotmailer import dotmailer_consent_form, process_newsletter_form

urlpatterns = [
    url(r"^news_signup/$", process_newsletter_form, name="process_newsletter_form"),
    url(r"^consent_form/$", dotmailer_consent_form, name="consent_form"),
    url(r".*", render_react, name="react_app"),
]

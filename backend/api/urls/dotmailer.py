from django.urls import path

from ..views.dotmailer import (
    process_newsletter_form,
    dotmailer_consent_form,
)


urlpatterns = [
    path(
        "news_signup/",
        process_newsletter_form,
        name="process_newsletter_form",
    ),
    path(
        "consent_form/",
        dotmailer_consent_form,
        name="consent_form",
    ),
]

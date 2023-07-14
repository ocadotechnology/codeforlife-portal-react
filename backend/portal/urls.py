from django.conf.urls import url
from django.http import JsonResponse

from portal.views.login.teacher import TeacherLoginView
from portal.views.email import verify_email
from portal.views.views import render_react
from portal.views.dotmailer import dotmailer_consent_form, process_newsletter_form
from .views.home import (
    render_signup_form,
    download_student_pack,
    banner_message,
    terms_and_conditions,
    privacy_notice,
)

JWT_REGEX = r"[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+"


def override_legacy_views(request, status_code=200):
    # TODO: Remove this once the legacy views are no longer used
    # Replace the legacy views with a redirect on the frontend to the new views

    return JsonResponse({"overriding redirect"}, status=status_code)


urlpatterns = [
    url(r"^api/news_signup/$", process_newsletter_form, name="process_newsletter_form"),
    url(r"^api/consent_form/$", dotmailer_consent_form, name="consent_form"),
    url(r"^api/register/$", render_signup_form, name="register"),
    url(r"^api/login/$", TeacherLoginView.as_view(), name="teacher_login"),
    url(rf"^verify_email/(?P<token>{JWT_REGEX})/$", verify_email, name="verify_email"),
    url(
        r"^terms",
        terms_and_conditions,
        name="terms",
    ),
    url(
        r"^privacy-notice/$",
        privacy_notice,
        name="privacy_notice",
    ),
    url(
        r"^api/codingClub/(?P<student_pack_type>[3-4])/$",
        download_student_pack,
        name="download_student_pack",
    ),
    url(r"^api/banner-message/$", banner_message, name="banner_message"),
    url(r"^(?!api\/).*", render_react, name="react_app"),
]

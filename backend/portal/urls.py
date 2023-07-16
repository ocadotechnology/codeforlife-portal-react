from django.conf.urls import url
from django.http import JsonResponse

from portal.views.login.teacher import TeacherLoginView
from portal.views.email import verify_email
from portal.views.views import render_react
from portal.views.dotmailer import dotmailer_consent_form, process_newsletter_form
from .views.home import (
    render_signup_form,
    count_student_pack_downloads,
    banner_message,
)

JWT_REGEX = r"[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+"


urlpatterns = [
    url(r"^api/news_signup/$", process_newsletter_form, name="process_newsletter_form"),
    url(r"^api/consent_form/$", dotmailer_consent_form, name="consent_form"),
    url(r"^api/register/$", render_signup_form, name="register"),
    url(r"^api/login/$", TeacherLoginView.as_view(), name="teacher_login"),
    url(rf"^verify_email/(?P<token>{JWT_REGEX})/$", verify_email, name="verify_email"),
    url(
        r"^api/codingClub/(?P<student_pack_type>[3-4])/$",
        count_student_pack_downloads,
        name="download_student_pack",
    ),
    url(r"^api/banner-message/$", banner_message, name="banner_message"),
    url(r"^(?!api\/).*", render_react, name="react_app"),
]

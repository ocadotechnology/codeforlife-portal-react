from django.urls import path, re_path

# from portal.views.login.teacher import TeacherLoginView
# from portal.views.email import verify_email
from ..views.home import (
    render_signup_form,
    count_student_pack_downloads,
    banner_message,
)

JWT_REGEX = r"[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+"

urlpatterns = [
    path(
        "register/",
        render_signup_form,
        name="register",
    ),
    # url(r"^api/login/$", TeacherLoginView.as_view(), name="teacher_login"),
    # re_path(
    #     rf"^verify_email/(?P<token>{JWT_REGEX})/$",
    #     verify_email,
    #     name="verify_email",
    # ),
    re_path(
        r"codingClub/(?P<student_pack_type>[3-4])/$",
        count_student_pack_downloads,
        name="download_student_pack",
    ),
    path(
        "banner-message/",
        banner_message,
        name="banner_message",
    ),
]

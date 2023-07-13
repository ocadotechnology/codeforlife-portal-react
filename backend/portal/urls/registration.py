from django.urls import path, re_path

from ..views.registration import (
    student_password_reset,
    teacher_password_reset,
    password_reset_done,
    password_reset_check_and_confirm,
    delete_account,
)


urlpatterns = [
    path(
        "user/password/reset/student/",
        student_password_reset,
        name="student_password_reset",
    ),
    path(
        "user/password/reset/teacher/",
        teacher_password_reset,
        name="teacher_password_reset",
    ),
    path(
        "user/password/reset/done/",
        password_reset_done,
        name="reset_password_email_sent",
    ),
    re_path(
        r"^user/password/reset/(?P<uidb64>[0-9A-Za-z]+)-(?P<token>.+)/$",
        password_reset_check_and_confirm,
        name="password_reset_check_and_confirm",
    ),
    path(
        "delete/account/",
        delete_account,
        name="delete_account",
    ),
]

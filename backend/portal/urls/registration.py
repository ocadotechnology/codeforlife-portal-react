from django.urls import path, re_path

from ..views.registration import (
    student_password_reset,
    teacher_password_reset,
    password_reset_check_and_confirm,
    delete_account,
    verify_password,
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
    path("verify-password/", verify_password, name="verify_password"),
]

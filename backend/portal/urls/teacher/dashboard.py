from django.urls import path, re_path

from ...views.teacher.dashboard import (
    dashboard_manage,
    organisation_kick,
    organisation_toggle_admin,
    teacher_disable_2FA,
    teacher_accept_student_request,
    teacher_reject_student_request,
    resend_invite_teacher,
    invite_toggle_admin,
    delete_teacher_invite,
    invite_teacher,
    invited_teacher,
    update_school,
<<<<<<< HEAD
    process_update_account_form,
    teacher_2fa_handler,
=======
    create_new_class,
    get_student_request_data,
    get_students_from_access_code,
>>>>>>> development
)

from ...helpers.regexes import ACCESS_CODE_REGEX

urlpatterns = [
    path("teach/dashboard/", dashboard_manage, name="dashboard"),
    path("teach/invite/", invite_teacher, name="invite_teacher"),
    path("teach/update_school/", update_school, name="update_school"),
<<<<<<< HEAD
=======
    path("teach/create_new_class/", create_new_class, name="create_new_class"),
>>>>>>> development
    re_path(
        r"^invited_teacher/(?P<token>[0-9a-f]+)/$",
        invited_teacher,
        name="invited_teacher",
    ),
    re_path(
        r"^teach/dashboard/kick/(?P<pk>[0-9]+)/$",
        organisation_kick,
        name="organisation_kick",
    ),
    re_path(
        r"^teach/dashboard/toggle_admin/(?P<pk>[0-9]+)/$",
        organisation_toggle_admin,
        name="organisation_toggle_admin",
    ),
    re_path(
        r"^teach/dashboard/invite_toggle_admin/(?P<invite_id>[0-9]+)/$",
        invite_toggle_admin,
        name="invite_toggle_admin",
    ),
    re_path(
        r"^teach/dashboard/resend_invite/(?P<token>[0-9a-f]+)/$",
        resend_invite_teacher,
        name="resend_invite_teacher",
    ),
    re_path(
        r"^teach/dashboard/delete_invite/(?P<token>[0-9a-f]+)/$",
        delete_teacher_invite,
        name="delete_teacher_invite",
    ),
    re_path(
        r"^teach/dashboard/disable_2FA/(?P<pk>[0-9]+)/$",
        teacher_disable_2FA,
        name="teacher_disable_2FA",
    ),
    re_path(
        r"^teach/dashboard/student/accept/(?P<pk>[0-9]+)/$",
        teacher_accept_student_request,
        name="teacher_accept_student_request",
    ),
    re_path(
        r"^teach/dashboard/student/reject/(?P<pk>[0-9]+)/$",
        teacher_reject_student_request,
        name="teacher_reject_student_request",
    ),
<<<<<<< HEAD
    path(
        "teacher/update/account/",
        process_update_account_form,
        name="process_update_account_form",
    ),
    path("teacher/handle-2fa/", teacher_2fa_handler, name="teacher_has_2fa"),
=======
    re_path(
        r"^teach/dashboard/student/request/(?P<pk>[0-9]+)/$",
        get_student_request_data,
        name="get_student_request_data",
    ),
    re_path(
        rf"^class/students/(?P<access_code>{ACCESS_CODE_REGEX})/$",
        get_students_from_access_code,
        name="get_students_from_acccess_code",
    ),
>>>>>>> development
]

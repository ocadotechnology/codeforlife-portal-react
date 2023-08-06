from django.urls import path, re_path

# from ..helpers.decorators import ratelimit
# from ..helpers.ratelimit import (
#     RATELIMIT_LOGIN_GROUP,
#     RATELIMIT_METHOD,
#     RATELIMIT_LOGIN_RATE,
#     RATELIMIT_LOGIN_RATE_SCHOOL_STUDENT,
#     school_student_key,
# )

from ..helpers.regexes import ACCESS_CODE_REGEX
from ..views.login import (
    session_expired_view,
    # old_login_form_redirect,
    # TeacherLoginView,
    teacher_login_view,
    # StudentLoginView,
    student_login_view,
    # StudentClassCodeView,
    student_direct_login,
    # IndependentStudentLoginView,
    independent_student_login_view,
)

urlpatterns = [
    path(
        "login/session-expired/",
        session_expired_view,
        name="session-expired",
    ),
    # path(
    #     "login_form",
    #     old_login_form_redirect,
    #     name="old_login_form",
    # ),
    path(
        "login/teacher/",
        # The ratelimit decorator checks how often a POST request is performed on that view.
        # It checks against the username value specifically. If the number of requests
        # exceeds the specified rate, then the user will be blocked (if block = True).
        # ratelimit(
        #     group=RATELIMIT_LOGIN_GROUP,
        #     key="post:auth-username",
        #     method=RATELIMIT_METHOD,
        #     rate=RATELIMIT_LOGIN_RATE,
        #     block=True,
        # )(TeacherLoginView.as_view()),
        teacher_login_view,
        name="teacher_login",
    ),
    re_path(
        rf"^login/student/(?P<access_code>{ACCESS_CODE_REGEX})/$",  # (?:(?P<login_type>classform)/)?$",
        # ratelimit(
        #     group=RATELIMIT_LOGIN_GROUP,
        #     key=school_student_key,
        #     method=RATELIMIT_METHOD,
        #     rate=RATELIMIT_LOGIN_RATE_SCHOOL_STUDENT,
        #     block=True,
        #     is_teacher=False,
        # )(StudentLoginView.as_view()),
        student_login_view,
        name="student_login",
    ),
    # path(
    #     "login/student/",
    #     StudentClassCodeView.as_view(),
    #     name="student_login_access_code",
    # ),
    re_path(
        r"^u/(?P<user_id>[0-9]+)/(?P<login_id>[a-z0-9]+)/$",
        student_direct_login,
        name="student_direct_login",
    ),
    path(
        "login/independent/",
        # TODO
        # ratelimit(
        #     group=RATELIMIT_LOGIN_GROUP,
        #     key="post:username",
        #     method=RATELIMIT_METHOD,
        #     rate=RATELIMIT_LOGIN_RATE,
        #     block=True,
        #     is_teacher=False,
        # )(IndependentStudentLoginView.as_view()),
        independent_student_login_view,
        name="independent_student_login",
    ),
]

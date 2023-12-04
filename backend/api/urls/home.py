from django.urls import path, re_path

from ..views.home import (
    # coding_club,
    download_student_pack,
    # home,
    # home_learning,
    logout_view,
    register_view,
    # reset_screentime_warning,
)

JWT_REGEX = r"[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+"

urlpatterns = [
    # url(
    #     r"^$",
    #     home,
    #     name="home",
    # ),
    # url(
    #     r"^home-learning",
    #     home_learning,
    #     name="home-learning",
    # ),
    # url(
    #     r"^codingClub/$",
    #     coding_club,
    #     name="codingClub",
    # ),
    re_path(
        r"^codingClub/(?P<student_pack_type>[3-4])/",
        download_student_pack,
        name="download_student_pack",
    ),
    path(
        "session/logout/",
        logout_view,
        name="logout_view",
    ),
    path(
        "register/",
        register_view,
        name="register",
    ),
    # url(
    #     r"^user/reset_screentime_warning/$",
    #     reset_screentime_warning,
    #     name="reset_screentime_warning",
    # ),
]

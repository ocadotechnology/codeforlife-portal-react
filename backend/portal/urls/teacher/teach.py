from django.urls import path, re_path

from ...helpers.regexes import ACCESS_CODE_REGEX
from ...views.teacher.teach import (
    teacher_edit_class,
    teacher_delete_class,
    teacher_move_class,
)


urlpatterns = [
    re_path(
        rf"class/edit/(?P<access_code>{ACCESS_CODE_REGEX})$",
        teacher_edit_class,
        name="teacher_edit_class",
    ),
    re_path(
        rf"class/delete/(?P<access_code>{ACCESS_CODE_REGEX})$",
        teacher_delete_class,
        name="teacher_delete_class",
    ),
    path(
        "move_class/",
        teacher_move_class,
        name="teacher_move_class",
    ),
]

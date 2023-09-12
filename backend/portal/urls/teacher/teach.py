from django.urls import re_path

from ...helpers.regexes import ACCESS_CODE_REGEX
from ...views.teacher.teach import (
    teacher_edit_class,
)


urlpatterns = [
    re_path(
        rf"class/edit/(?P<access_code>{ACCESS_CODE_REGEX})$",
        teacher_edit_class,
        name="teacher_edit_class",
    ),
]

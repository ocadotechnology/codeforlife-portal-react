from django.urls import re_path, path

from ...helpers.regexes import ACCESS_CODE_REGEX
from ...views.teacher.teach import (
    teacher_edit_class,
    teacher_edit_student,
    teacher_download_csv,
    teacher_print_reminder_cards,
    pdf_url,
)


urlpatterns = [
    re_path(
        rf"class/edit/(?P<access_code>{ACCESS_CODE_REGEX})$",
        teacher_edit_class,
        name="teacher_edit_class",
    ),
    path(
        "student/edit/<int:pk>",
        teacher_edit_student,
        name="teacher_edit_student",
    ),
    re_path(
        rf"onboarding-class/(?P<access_code>{ACCESS_CODE_REGEX})/download-csv/",
        teacher_download_csv,
        name="teacher_download_csv",
    ),
    re_path(
        rf"onboarding-class/(?P<access_code>{ACCESS_CODE_REGEX})/print-reminder-cards/",
        teacher_print_reminder_cards,
        name="teacher_print_reminder_cards",
    ),
    path("help/<int:id>", pdf_url, name="teacher_print_reminder_cards"),
]

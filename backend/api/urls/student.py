from django.urls import path

from ..views.student import (
    handle_kurono_game_data,
    handle_rapid_router_scores,
    is_pending_class_request,
    student_join_organisation,
)
from ..views.student.edit_account_details import (
    SchoolStudentEditAccountView,
    change_independent_details,
    delete_independent_account,
)

urlpatterns = [
    path(
        "student/rapid_router_scores/",
        handle_rapid_router_scores,
        name="rr_scores",
    ),
    path(
        "student/kurono_game_data/",
        handle_kurono_game_data,
        name="kurono_game_data",
    ),
    path(
        "independent/edit-details/",
        change_independent_details,
        name="change_independent_details",
    ),
    path(
        "school-student/edit-details/",
        SchoolStudentEditAccountView.as_view(),
        name="school_student_edit_details",
    ),
    path(
        "independent/delete/",
        delete_independent_account,
        name="delete_independent_account",
    ),
    path(
        "student-join-organisation/",
        student_join_organisation,
        name="student_join",
    ),
    path(
        "is-pending-class-request/",
        is_pending_class_request,
        name="is_pending_class_request",
    ),
]

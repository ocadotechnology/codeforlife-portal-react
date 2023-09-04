from django.urls import path
from portal.views.student import (
    handle_rapid_router_scores,
    handle_kurono_game_data,
)
from portal.views.student.edit_account_details import (
    change_independent_details,
    change_school_student_details,
    SchoolStudentEditAccountView,
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
        name=change_independent_details.__name__,
    ),
    path(
        "school-student/edit-details/",
        SchoolStudentEditAccountView.as_view(),
        name="school_student_edit_details",
    ),
    path(
        "independent/delete/",
        delete_independent_account,
        name=delete_independent_account.__name__,
    ),
]

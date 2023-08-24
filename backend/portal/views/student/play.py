from typing import Any, Dict, Optional, List

from aimmo.models import Game
from common import email_messages
from common.helpers.emails import NOTIFICATION_EMAIL, send_email
from common.models import Student
from common.permissions import (
    logged_in_as_independent_student,
    logged_in_as_school_student,
)
from common.utils import LoginRequiredNoErrorMixin
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import UserPassesTestMixin
from django.db.models.query import QuerySet
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from game.models import Level, Attempt

from portal.forms.play import StudentJoinOrganisationForm

from django.views.generic.edit import FormView


class SchoolStudentDashboard(LoginRequiredNoErrorMixin, UserPassesTestMixin, TemplateView):
    template_name = "portal/play/student_dashboard.html"
    login_url = reverse_lazy("student_login_access_code")

    def test_func(self) -> Optional[bool]:
        return logged_in_as_school_student(self.request.user)

    def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
        """
        Gathers the context data required by the template. First, the student's scores
        for the original Rapid Router levels is gathered, second, the student's scores
        for any levels shared with them by their teacher, and third, the student's
        Kurono game information if they have one.
        """
        # Get score data for all original levels
        levels = Level.objects.sorted_levels()
        student = self.request.user.new_student

        context_data = _compute_rapid_router_scores(student, levels)

        # Find any custom levels created by the teacher and shared with the student
        klass = student.class_field
        teacher = klass.teacher.user
        custom_levels = student.new_user.shared.filter(owner=teacher)

        if custom_levels:
            custom_levels_data = _compute_rapid_router_scores(student, custom_levels)

            context_data["total_custom_score"] = custom_levels_data["total_score"]
            context_data["total_custom_available_score"] = custom_levels_data["total_available_score"]

        # Get Kurono game info if the class has a game linked to it
        aimmo_game = klass.active_game
        if aimmo_game:
            active_worksheet = aimmo_game.worksheet

            context_data["worksheet_id"] = active_worksheet.id
            context_data["worksheet_image"] = active_worksheet.image_path

        return context_data


# class IndependentStudentDashboard(LoginRequiredNoErrorMixin, UserPassesTestMixin, TemplateView, FormView):
#     template_name = "portal/play/independent_student_dashboard.html"
#     login_url = reverse_lazy("independent_student_login")

#     def test_func(self) -> Optional[bool]:
#         return logged_in_as_independent_student(self.request.user)

#     def get_context_data(self, **kwargs: Any) -> Dict[str, Any]:
#         levels = Level.objects.sorted_levels()
#         student = self.request.user.new_student

#         return _compute_rapid_router_scores(
#             student,
#             levels,
#         )



def username_labeller(request):
    return request.user.username


@login_required(login_url=reverse_lazy("independent_student_login"))
@user_passes_test(
    logged_in_as_independent_student,
    login_url=reverse_lazy("independent_student_login"),
)
def student_join_organisation(request):

    student = request.user.new_student
    request_form = StudentJoinOrganisationForm()

    # check student not managed by a school
    if student.class_field:
        return HttpResponseRedirect(reverse_lazy("student_details"))

    if request.method == "POST":
        if "class_join_request" in request.POST:
            request_form = StudentJoinOrganisationForm(request.POST)
            process_join_organisation_form(request_form, request, student)

        elif "revoke_join_request" in request.POST:
            student.pending_class_request = None
            student.save()
            # Check teacher hasn't since accepted rejection before posting success
            show_cancellation_message_if_student_not_in_class(student, request)
            return HttpResponseRedirect(reverse_lazy("student_edit_account"))

    res = render(
        request,
        "portal/play/student_join_organisation.html",
        {"request_form": request_form, "student": student},
    )
    return res


def process_join_organisation_form(request_form, request, student):
    if request_form.is_valid():
        student.pending_class_request = request_form.klass
        student.save()

        email_message = email_messages.studentJoinRequestSentEmail(
            request,
            request_form.klass.teacher.school.name,
            request_form.klass.access_code,
        )
        send_email(
            NOTIFICATION_EMAIL,
            [student.new_user.email],
            email_message["subject"],
            email_message["message"],
            email_message["subject"],
        )

        email_message = email_messages.studentJoinRequestNotifyEmail(
            request,
            student.new_user.username,
            student.new_user.email,
            student.pending_class_request.access_code,
        )
        send_email(
            NOTIFICATION_EMAIL,
            [student.pending_class_request.teacher.new_user.email],
            email_message["subject"],
            email_message["message"],
            email_message["subject"],
        )

        messages.success(request, "Your request to join a school has been received successfully.")


def show_cancellation_message_if_student_not_in_class(student, request):
    if not student.class_field:
        messages.success(request, "Your request to join a school has been cancelled successfully.")

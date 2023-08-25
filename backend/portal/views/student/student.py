from typing import Any, Dict, Optional, List

from aimmo.models import Game
from common import email_messages
from common.helpers.emails import NOTIFICATION_EMAIL, send_email
from common.models import Student, Class
from common.permissions import (
    logged_in_as_independent_student,
    logged_in_as_school_student,
)
from django.views.decorators.http import require_GET, require_POST
from common.utils import LoginRequiredNoErrorMixin
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.mixins import UserPassesTestMixin
from django.db.models.query import QuerySet
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic.base import TemplateView
from game.models import Level, Attempt

from portal.forms.play import StudentJoinOrganisationForm

from django.views.generic.edit import FormView
from django.shortcuts import render, get_object_or_404
from rest_framework import status



# @require_POST
@login_required(login_url=reverse_lazy("independent_student_login"))
def handle_rapid_router_scores(request):
    levels = Level.objects.all()
    student = get_object_or_404(Student, new_user=request.user.id)
    
    # Compute scores for the found student
    return compute_rapid_router_scores(student, levels)


@login_required(login_url=reverse_lazy("student_login"))
def handle_kurono_game_data(request):
    student = get_object_or_404(Student, new_user=request.user.id)
    klass = Class.objects.get(id=student.class_field_id)
    aimmo_game = klass.active_game
    response_data = {
        "worksheet_id": aimmo_game.worksheet.id if aimmo_game else 0,
        "worksheet_image": aimmo_game.worksheet.image_path if aimmo_game else ""
    }
    return JsonResponse(response_data)


def compute_rapid_router_scores(student: Student, levels: List[Level] or QuerySet) -> Dict[str, int]:
    """
    Finds Rapid Router progress and score data for a specific student and a specific
    set of levels. This is used to show quick score data to the student on their
    dashboard.
    :param student: the student whose progress this is looking for
    :param levels: the list of levels to gather the progress data of
    :return: a dictionary of integers:
    - num_completed: number of completed levels. A completed level is a level that has a
    successful attempt (van made it to the final house) regardless of the final score.
    - num_top_scores: number of levels that have been completed with a full final score
    of either 10/10 or 20/20 (depending on whether the level has route score enabled)
    - total_score: the addition of all the completed levels' final scores
    - total_available_score: the addition of the maximum attainable score of all levels
    """
    num_completed = num_top_scores = total_available_score = 0
    total_score = 0.0
    # Get a QuerySet of best attempts for each level
    best_attempts = Attempt.objects.filter(level__in=levels, student=student, is_best_attempt=True).select_related(
        "level"
    )

    # Calculate total available score. A level has a max score of 20 by default unless
    # its route score is disabled or it is a custom level (not in an episode)
    for level in levels:
        max_score = 10 if level.disable_route_score or not level.episode else 20
        total_available_score += max_score

    # For each level, compare best attempt's score with level's max score and increment
    # variables as needed
    if best_attempts:
        attempts_dict = {best_attempt.level.id: best_attempt for best_attempt in best_attempts}
        for level in levels:
            max_score = 10 if level.disable_route_score or not level.episode else 20
            attempt = attempts_dict.get(level.id)

            if attempt and attempt.score:
                num_completed += 1
                if attempt.score == max_score:
                    num_top_scores += 1

                total_score += attempt.score

    return JsonResponse({
        "num_completed": num_completed,
        "num_top_scores": num_top_scores,
        "total_score": int(total_score),
        "total_available_score": total_available_score,
    })

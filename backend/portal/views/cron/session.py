import logging
from common.models import Student, Teacher
from django.contrib.sessions.models import Session, SessionManager
from django.core.management import call_command
from django.http import HttpResponse, JsonResponse
from django.middleware.csrf import get_token
import datetime
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import viewsets, status


def get_user_type(user):
    found_teacher = Teacher.objects.filter(new_user=user)
    found_school_student = Student.objects.filter(new_user=user).exclude(
        class_field=None
    )
    found_independent_student = Student.objects.filter(
        new_user=user, class_field=None
    )

    if found_teacher:
        return "teacher"
    elif found_school_student:
        return "school_student"
    elif found_independent_student:
        return "independent_student"


def get_csrf_token(request):
    if request.user.is_authenticated:
        return JsonResponse(
            {"user_type": get_user_type(request.user)},
        )
    response = HttpResponse()
    max_age = 7 * 24 * 60 * 60  # 7 days in seconds
    expires = datetime.datetime.utcnow() + datetime.timedelta(days=7)
    response.set_cookie(
        "csrftoken", get_token(request), max_age=max_age, expires=expires
    )
    return response


class ClearSessionsViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        # objects is missing type SessionManager
        session_objects: SessionManager = Session.objects
        return session_objects.all()

    def list(self, request: Request):
        queryset = self.get_queryset()

        before_session_count = queryset.count()
        logging.info(f"Session count before clearance: {before_session_count}")

        # Clears expired sessions.
        # https://docs.djangoproject.com/en/3.2/ref/django-admin/#clearsessions
        call_command("clearsessions")

        after_session_count = queryset.count()
        logging.info(f"Session count after clearance: {after_session_count}")
        session_clearance_count = before_session_count - after_session_count
        logging.info(f"Session clearance count: {session_clearance_count}")

        return Response()

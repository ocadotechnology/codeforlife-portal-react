import logging

from django.contrib.sessions.models import Session, SessionManager
from django.core.management import call_command
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import viewsets


class ClearSessionsViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        # objects is missing type SessionManager
        session_objects: SessionManager = Session.objects
        return session_objects.all()

    def list(self, request: Request):
        queryset = self.get_queryset()

        before_session_count = queryset.count()
        logging.info(f"Session count before clearance: {before_session_count}")

        call_command("clearsessions")

        after_session_count = queryset.count()
        logging.info(f"Session count after clearance: {after_session_count}")
        session_clearance_count = before_session_count - after_session_count
        logging.info(f"Session clearance count: {session_clearance_count}")

        return Response()

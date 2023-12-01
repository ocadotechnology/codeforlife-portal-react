"""
© Ocado Group
Created on 01/12/2023 at 16:02:18(+00:00).
"""

from codeforlife.user.models import User
from django.views import View
from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class UserHasSessionAuthFactors(BasePermission):
    def has_permission(self, request: Request, view: View):
        return (
            isinstance(request.user, User)
            and request.user.session.session_auth_factors.exists()
        )

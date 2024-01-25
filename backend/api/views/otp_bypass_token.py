"""
© Ocado Group
Created on 23/01/2024 at 17:54:08(+00:00).
"""

import typing as t

from codeforlife.permissions import AllowNone
from codeforlife.request import Request
from codeforlife.user.models import OtpBypassToken, User
from codeforlife.user.permissions import IsTeacher
from codeforlife.views import ModelViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class OtpBypassTokenViewSet(ModelViewSet[OtpBypassToken]):
    http_method_names = ["post"]

    def get_queryset(self):
        user: User = self.request.user  # type: ignore[assignment]
        return OtpBypassToken.objects.filter(user=user)

    def get_permissions(self):
        if self.action == "create":
            return [AllowNone()]

        return [IsTeacher()]

    @action(detail=False, methods=["post"])
    def generate(self, request: Request):
        """Generates some OTP bypass tokens for a user."""

        user = t.cast(User, request.user)

        OtpBypassToken.objects.filter(user=user).delete()

        tokens = OtpBypassToken.generate_tokens()

        OtpBypassToken.objects.bulk_create(
            [OtpBypassToken(user=user, token=token) for token in tokens]
        )

        return Response(tokens, status.HTTP_201_CREATED)

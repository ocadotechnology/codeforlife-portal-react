"""
© Ocado Group
Created on 23/01/2024 at 17:54:08(+00:00).
"""

import typing as t

from codeforlife.permissions import AllowNone
from codeforlife.request import Request
from codeforlife.user.models import OtpBypassToken, User
from django.utils.crypto import get_random_string
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class OtpBypassTokenViewSet(ModelViewSet):
    http_method_names = ["post"]

    def get_queryset(self):
        user: User = self.request.user  # type: ignore[assignment]
        return OtpBypassToken.objects.filter(user=user)

    def get_permissions(self):
        if self.action == "create":
            return [AllowNone()]

        return super().get_permissions()

    @action(detail=False, methods=["post"])
    def generate(self, request: Request):
        """Generates some OTP bypass tokens for a user."""

        user = t.cast(User, request.user)

        OtpBypassToken.objects.filter(user=user).delete()

        tokens = [
            get_random_string(
                OtpBypassToken.token.max_length  # type: ignore[attr-defined]
            )
            for _ in range(OtpBypassToken.max_count)
        ]

        OtpBypassToken.objects.bulk_create(
            [OtpBypassToken(user=user, token=token) for token in tokens]
        )

        return Response(tokens, status.HTTP_201_CREATED)

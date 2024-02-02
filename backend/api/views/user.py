"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

import typing as t

from codeforlife.request import Request
from codeforlife.user.models import User
from codeforlife.user.permissions import IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers import UserSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "bulk":
            return [IsTeacher()]

        return super().get_permissions()

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def is_unique_email(self, request: Request):
        """Checks if an email is unique."""

        email: t.Optional[str] = request.data.get("email")
        return Response(
            email and not User.objects.filter(email__iexact=email).exists()
        )

    @action(
        detail=True,
        methods=["get", "patch"],
        url_path="reset-password/(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def reset_password(
        self, request: Request, pk: int = None, token: str = None
    ):
        """
        Handles password reset for a user. On GET, checks validity of user PK
        and token. On PATCH, rechecks these params and performs new password
        validation and update.
        :param token: Django-generated user token for password reset, expires
        after 1 hour.
        """
        try:
            user = User.objects.get(pk=pk)
        except (TypeError, ValueError, OverflowError, ObjectDoesNotExist):
            return Response(
                {"non_field_errors": ["No user found for given ID."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(user, token):
            return Response(
                {"non_field_errors": ["Token doesn't match given user."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if request.method == "PATCH":
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # TODO: Check if need to handle resetting ratelimit & unblocking of user

        return Response()

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def request_password_reset(self, request: Request):
        """
        Generates a reset password URL to be emailed to the user if the
        given email address exists.
        """
        email = request.data.get("email")

        if email is None:
            return Response(
                {"email": ["Field is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(email__iexact=email)
        except ObjectDoesNotExist:
            # NOTE: Always return a 200 here - a noticeable change in behaviour would allow email enumeration.
            return Response()

        token = default_token_generator.make_token(user)

        reset_password_url = self.reverse_action(
            "reset-password", kwargs={"pk": user.pk, "token": token}
        )

        # TODO: Send email to user with URL to reset password.
        return Response(
            {
                "reset_password_url": reset_password_url,
                "pk": user.pk,
                "token": token,
            }
        )

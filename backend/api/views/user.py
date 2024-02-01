"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

import typing as t

from codeforlife.user.models import User
from codeforlife.user.permissions import IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers import PasswordResetSerializer, UserSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "bulk":
            return [IsTeacher()]

        return super().get_permissions()

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def is_unique_email(self, request):
        """Checks if an email is unique."""

        email: t.Optional[str] = request.data.get("email")
        return Response(
            email and not User.objects.filter(email__iexact=email).exists()
        )

    @action(
        detail=False,
        methods=["get", "patch"],
        url_path="reset-password/(?P<uidb64>[a-zA-Z0-9]+)-(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def reset_password(self, request, uidb64=None, token=None):
        def _find_user_from_uidb64(uidb64):
            uid = force_str(urlsafe_base64_decode(uidb64))
            return User.objects.get(pk=uid)

        if request.method == "GET":
            try:
                user = _find_user_from_uidb64(uidb64)
            except (TypeError, ValueError, OverflowError, ObjectDoesNotExist):
                return Response(
                    {"non_field_errors": ["no user found for given uid"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not default_token_generator.check_token(user, token):
                return Response(
                    {"non_field_errors": ["token doesn't match given user"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response()

        serializer = PasswordResetSerializer(
            _find_user_from_uidb64(uidb64), data=request.data
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # TODO: Check if need to handle resetting ratelimit and unblocking of user

        return Response()

    @action(detail=False, methods=["post"], permission_classes=[AllowAny])
    def request_password_reset(self, request):
        """
        Generates a reset password URL to be emailed to the user if the
        given email address exists.
        """
        email = request.data.get("email")

        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            # NOTE: Always return a 200 here - a noticeable change in behaviour would allow email enumeration.
            return Response()

        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_password_url = self.reverse_action(
            "reset-password", kwargs={"uidb64": uidb64, "token": token}
        )

        # TODO: Send email to user with URL to reset password.
        return Response(
            {
                "reset_password_url": reset_password_url,
                "uidb64": uidb64,
                "token": token,
            }
        )

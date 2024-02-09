"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

import json
import typing as t
from datetime import timedelta
from uuid import uuid4

from codeforlife.request import Request
from codeforlife.user.models import Teacher, User, UserProfile
from codeforlife.user.permissions import InSchool, IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..models import SchoolTeacherInvitation
from ..serializers import UserSerializer

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "invite_teacher":
            return [IsTeacher(is_admin=True), InSchool()]
        if self.action == "bulk":
            return [IsTeacher(), InSchool()]
        if self.action == "partial_update":
            if "teacher" in self.request.data:
                return [IsTeacher(is_admin=True), InSchool()]
            if "student" in self.request.data:
                return [IsTeacher(), InSchool()]

        return super().get_permissions()

    @action(
        detail=True,
        methods=["get", "patch"],
        url_path="reset-password/(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def reset_password(
        self,
        request: Request,
        pk: t.Optional[str] = None,
        token: t.Optional[str] = None,
    ):
        """
        Handles password reset for a user. On GET, checks validity of user PK
        and token. On PATCH, rechecks these params and performs new password
        validation and update.
        :param token: Django-generated user token for password reset, expires
        after 1 hour.
        """

        user_not_found_response = Response(
            {"non_field_errors": ["No user found for given ID."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

        if pk is None:
            return user_not_found_response

        try:
            user = User.objects.get(pk=int(pk))
        except (ValueError, User.DoesNotExist):
            return user_not_found_response

        if not default_token_generator.check_token(user, token):
            return Response(
                {"non_field_errors": ["Token doesn't match given user."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if request.method == "PATCH":
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            # TODO: Check if need to handle resetting ratelimit & unblocking
            #  of user

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
        except User.DoesNotExist:
            # NOTE: Always return a 200 here - a noticeable change in
            # behaviour would allow email enumeration.
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

    @action(
        detail=False,
        methods=["get", "post"],
        url_path="accept-invite/(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def accept_invite(self, request: Request, token: t.Optional[str] = None):
        """
        Handles password reset for a user. On GET, checks validity of user PK
        and token. On PATCH, rechecks these params and performs new password
        validation and update.
        :param token: Django-generated user token for password reset, expires
        after 1 hour.
        """
        try:
            invitation = SchoolTeacherInvitation.objects.get(token=token)

            if invitation.expiry < timezone.now():
                return Response(
                    {"non_field_errors": ["The invitation has expired."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except SchoolTeacherInvitation.DoesNotExist:
            return Response(
                {"non_field_errors": ["The invitation does not exist."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if User.objects.filter(
            email__iexact=invitation.invited_teacher_email
        ).exists():
            return Response(
                {
                    "non_field_errors": [
                        "It looks like an account is already registered with "
                        "this email address. You will need to delete the other "
                        "account first or change the email associated with it "
                        "in order to proceed. You will then be able to access "
                        "this page."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if request.method == "POST":

            user = User(
                username=invitation.invited_teacher_email,
                email=invitation.invited_teacher_email,
                password=request.data["password"],
                first_name=invitation.invited_teacher_first_name,
                last_name=invitation.invited_teacher_last_name,
            )

            user_profile = UserProfile(user=user, is_verified=True)

            Teacher(
                user=user_profile,
                new_user=user,
                is_admin=invitation.invited_teacher_is_admin,
                school=invitation.school,
            )

            context = self.get_serializer_context()
            context["invitation"] = invitation
            context["user"] = user

            serializer = self.get_serializer(data=request.data, context=context)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response()

    @action(detail=False, methods=["post"])
    def invite_teacher(self, request: Request):
        """Invite teacher"""
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        email = request.data.get("email")
        is_admin = request.data.get("is_admin")
        host_teacher = request.user.new_teacher
        school = host_teacher.school

        fields = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
        }

        for field_name, field in fields.items():
            if field is None:
                return Response(
                    {field_name: ["Field is required."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if User.objects.filter(email__iexact=email).exists():
            # NOTE: Always return a 200 here - a noticeable change in
            # behaviour would allow email enumeration.
            # TODO: Once the email logic is in place below, we will probably
            #  need to remove this.
            return Response()

        token = uuid4().hex
        SchoolTeacherInvitation.objects.create(
            token=token,
            school=school,
            from_teacher=host_teacher,
            invited_teacher_first_name=first_name,
            invited_teacher_last_name=last_name,
            invited_teacher_email=email,
            invited_teacher_is_admin=is_admin,
            expiry=timezone.now() + timedelta(days=30),
        )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        url = self.reverse_action("accept-invite", kwargs={"token": token})

        # TODO: Send email to invited teacher with URL to finish setting up
        #  account. Remember that email content changes depending on whether
        #  the invited teacher already has an account or not.
        return Response({"url": url, "token": token})

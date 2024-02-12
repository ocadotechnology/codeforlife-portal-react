"""
© Ocado Group
Created on 09/02/2024 at 16:14:00(+00:00).
"""

import typing as t

from codeforlife.permissions import AllowNone
from codeforlife.request import Request
from codeforlife.user.models import Teacher, User, UserProfile
from codeforlife.user.permissions import InSchool, IsTeacher
from codeforlife.views import ModelViewSet
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..models import SchoolTeacherInvitation
from ..serializers import SchoolTeacherInvitationSerializer, UserSerializer


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class SchoolTeacherInvitationViewSet(ModelViewSet[SchoolTeacherInvitation]):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = SchoolTeacherInvitationSerializer

    def get_permissions(self):
        if self.action in [
            "retrieve",
            "list",
            "create",
            "partial_update",
            "destroy",
        ]:
            return [IsTeacher(is_admin=True), InSchool()]
        if self.action == "bulk":
            return [AllowNone()]

        return super().get_permissions()

    def get_queryset(self):
        return SchoolTeacherInvitation.objects.filter(
            school=self.kwargs["school"]
        )

    @action(
        detail=True,
        methods=["get", "post"],
        url_path="accept/(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def accept(self, request: Request, pk: str, token: str):
        """
        Handles accepting a teacher's invitation to join their school. On GET,
        checks validity of the invitation token. On PATCH, rechecks this
        param, performs password validation and creates the new Teacher.
        """

        try:
            invitation = SchoolTeacherInvitation.objects.get(pk=int(pk))
        except (ValueError, SchoolTeacherInvitation.DoesNotExist):
            return Response(
                {"non_field_errors": ["The invitation does not exist."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # if not check_password(token):
        #     pass  # Return error response.

        if invitation.is_expired:
            return Response(
                {"non_field_errors": ["The invitation has expired."]},
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
            context = self.get_serializer_context()
            context["is_verified"] = True

            serializer = UserSerializer(data=request.data, context=context)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            invitation.delete()

        return Response()

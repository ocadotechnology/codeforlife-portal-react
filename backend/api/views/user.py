"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

from codeforlife.permissions import OR, AllowAny, AllowNone
from codeforlife.request import Request
from codeforlife.response import Response
from codeforlife.user.models import Class, SchoolTeacher, StudentUser, User
from codeforlife.user.permissions import IsIndependent, IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from codeforlife.views import action
from rest_framework import status
from rest_framework.serializers import ValidationError

from ..serializers import (
    HandleIndependentUserJoinClassRequestSerializer,
    RequestUserPasswordResetSerializer,
    ResetUserPasswordSerializer,
    UserSerializer,
)


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete", "put"]

    # pylint: disable-next=too-many-return-statements
    def get_permissions(self):
        if self.action == "bulk":
            return [AllowNone()]
        if self.action in ["request_password_reset", "reset_password"]:
            return [AllowAny()]
        if self.action == "destroy":
            return [OR(IsTeacher(), IsIndependent())]
        if self.action == "handle_join_class_request":
            return [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))]
        if self.action == "partial_update":
            # If updating a teacher-user.
            if "teacher" in self.request.data:
                return [IsTeacher(is_admin=True)]
            # If updating a student-user.
            if "student" in self.request.data:
                return [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))]
            if "requesting_to_join_class" in self.request.data:
                return [IsIndependent()]

        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "request_password_reset":
            return RequestUserPasswordResetSerializer
        if self.action == "reset_password":
            return ResetUserPasswordSerializer
        if self.action == "handle_join_class_request":
            return HandleIndependentUserJoinClassRequestSerializer

        return UserSerializer

    def get_queryset(self, user_class=User):
        if self.action == "reset_password":
            return User.objects.filter(pk=self.kwargs["pk"])
        if self.action == "handle_join_class_request":
            return self.request.school_teacher_user.teacher.indy_users

        queryset = super().get_queryset(user_class)
        if self.action == "destroy" or (
            self.action == "partial_update" and self.request.auth_user.student
        ):
            queryset = queryset.filter(pk=self.request.auth_user.pk)

        return queryset

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()

        def anonymize_user(user: User):
            user.first_name = ""
            user.last_name = ""
            user.email = ""
            user.is_active = False
            user.save()

        if user.teacher:
            if user.teacher.school:
                other_school_teachers = SchoolTeacher.objects.filter(
                    school=user.teacher.school
                ).exclude(pk=user.teacher.pk)

                if not other_school_teachers.exists():
                    user.teacher.school.anonymise()
                elif (
                    user.teacher.is_admin
                    and not other_school_teachers.filter(is_admin=True).exists()
                ):
                    return Response(status=status.HTTP_409_CONFLICT)

            klass: Class  # TODO: delete in new data schema
            for klass in user.teacher.class_teacher.all():
                for student_user in StudentUser.objects.filter(
                    new_student__class_field=klass
                ):
                    anonymize_user(student_user)

                klass.anonymise()

        anonymize_user(user)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def request_password_reset(self, request: Request):
        """
        Generates a reset password URL to be emailed to the user if the
        given email address exists.
        """
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as error:
            codes = error.get_codes()
            assert isinstance(codes, dict)
            email_codes = codes.get("email", [])
            assert isinstance(email_codes, list)
            if any(code == "does_not_exist" for code in email_codes):
                # NOTE: Always return a 200 here - a noticeable change in
                # behaviour would allow email enumeration.
                return Response()

            raise error

        return Response()

    reset_password = _UserViewSet.update_action("reset_password")
    handle_join_class_request = _UserViewSet.update_action(
        "handle_join_class_request"
    )

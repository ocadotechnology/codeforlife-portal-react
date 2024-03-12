"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""


from codeforlife.permissions import OR, AllowNone
from codeforlife.request import Request
from codeforlife.user.models import Class, SchoolTeacher, StudentUser, User
from codeforlife.user.permissions import IsIndependent, IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers import (
    HandleIndependentUserJoinClassRequestSerializer,
    UserSerializer,
)

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete", "put"]

    # pylint: disable-next=too-many-return-statements
    def get_permissions(self):
        if self.action == "bulk":
            return [AllowNone()]
        if self.action == "destroy":
            return [OR(IsTeacher(), IsIndependent())]
        if self.action == "independents__handle_join_class_request":
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
        if self.action == "independents__handle_join_class_request":
            return HandleIndependentUserJoinClassRequestSerializer

        return UserSerializer

    def get_queryset(self, user_class=User):
        if self.action == "independents__handle_join_class_request":
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

    @action(
        detail=True,
        methods=["get", "patch"],
        url_path="reset-password/(?P<token>.+)",
        permission_classes=[AllowAny],
    )
    def reset_password(self, request: Request, pk: str, token: str):
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

    @action(
        detail=False,
        methods=["post"],
        url_path="request-password-reset",
        permission_classes=[AllowAny],
    )
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
        detail=True,
        methods=["patch"],
        url_path="independents/handle-join-class-request",
    )
    def independents__handle_join_class_request(
        self, request: Request, pk: str
    ):
        """Handle an independent user's request to join a class."""
        serializer = self.get_serializer(
            self.get_object(),
            data=request.data,
            context=self.get_serializer_context(),
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

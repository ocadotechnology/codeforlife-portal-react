"""
© Ocado Group
Created on 23/01/2024 at 17:53:44(+00:00).
"""

import typing as t

from codeforlife.permissions import OR
from codeforlife.request import Request
from codeforlife.types import DataDict
from codeforlife.user.models import (
    Class,
    SchoolTeacher,
    Student,
    StudentUser,
    User,
)
from codeforlife.user.permissions import IsIndependent, IsTeacher
from codeforlife.user.views import UserViewSet as _UserViewSet
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.utils.crypto import get_random_string
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from ..serializers import UserSerializer

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class UserViewSet(_UserViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "destroy":
            return [OR(IsTeacher(), IsIndependent())]
        if self.action in ["bulk", "students__reset_password"]:
            return [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))]
        if self.action == "partial_update":
            if "teacher" in self.request.data:
                return [IsTeacher(is_admin=True)]
            if "student" in self.request.data:
                return [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))]
            if "requesting_to_join_class" in self.request.data:
                return [IsIndependent()]
        if self.action == "handle_join_class_request":
            return [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))]

        return super().get_permissions()

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == "destroy":
            queryset = queryset.filter(pk=self.request.auth_user.pk)
        elif (
            self.action == "bulk" and self.request.method in ["PATCH", "DELETE"]
        ) or self.action == "students__reset_password":
            queryset = queryset.filter(
                new_student__isnull=False,
                new_student__class_field__isnull=False,
            )
        return queryset

    def perform_bulk_destroy(self, queryset):
        queryset.update(first_name="", is_active=False)

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

    @action(detail=False, methods=["patch"], url_path="students/reset-password")
    def students__reset_password(self, request: Request):
        """Bulk reset students' password."""
        queryset = self._get_bulk_queryset(request.data)

        fields: t.Dict[int, DataDict] = {}
        for pk in queryset.values_list("pk", flat=True):
            student_user = StudentUser(pk=pk)
            student_user.set_password()

            fields[pk] = {
                # pylint: disable-next=protected-access
                "password": student_user._password,
                "student": {"login_id": student_user.student.login_id},
            }

            # TODO: replace with bulk update
            student_user.save(update_fields=["password"])
            student_user.student.save(update_fields=["login_id"])

        return Response(fields)

    @action(
        detail=True, methods=["patch"], url_path="handle-join-class-request"
    )
    def handle_join_class_request(
        self, request: Request, pk: t.Optional[str] = None
    ):
        """
        Handles an independent user's request to join a class. First tries to
        retrieve the independent user, then the class they're requesting to
        join. The teacher handling the request must either be an admin the
        class' school, or the teacher of that specific school. The request
        must then specify whether the teacher accepts or rejects the join
        request by setting the boolean "accept". If "accept" is True,
        then the request must contain the new student's first_name, ensuring
        that it is unique in the class.
        """
        try:
            indy = User.objects.get(pk=int(pk))
        except (ValueError, Student.DoesNotExist):
            return Response(
                {"non_field_errors": ["No user found for given ID."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        klass = Class.objects.get(
            access_code=indy.student.pending_class_request.access_code
        )

        if klass.teacher.school != request.user.new_teacher.school:
            return Response(
                {
                    "non_field_errors": [
                        "This class join request is not in your school."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            not request.user.new_teacher.is_admin
            and klass.teacher != request.user.new_teacher
        ):
            return Response(
                {
                    "non_field_errors": [
                        "This class join request is not for "
                        "one for your classes."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            if not isinstance(request.data["accept"], bool):
                return Response(
                    {
                        "non_field_errors": [
                            "Invalid type for accept - must be True or False."
                        ]
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except KeyError:
            return Response(
                {"non_field_errors": ["Accept field is required."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        request_accepted = request.data["accept"]

        if request_accepted:
            try:
                if not isinstance(request.data["first_name"], str):
                    return Response(
                        {"first_name": ["First name must be a string."]},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except KeyError:
                return Response(
                    {"first_name": ["This field is required."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            name = request.data["first_name"]
            if self._is_name_unique_in_class(name, klass):
                indy.student.class_field = indy.student.pending_class_request
                indy.student.pending_class_request = None

                username = None

                while (
                    username is None
                    or User.objects.filter(username=username).exists()
                ):
                    username = get_random_string(length=30)

                indy.username = username
                indy.first_name = name
                indy.last_name = ""
                indy.email = ""

                indy.student.save()
                indy.save()
            else:
                return Response(
                    {
                        "first_name": [
                            "This name already exists in the class. "
                            "Please choose a different name."
                        ]
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            indy.student.pending_class_request = None
            indy.student.save()

            # TODO: Send independent user an email notifying them that their
            #  request has been rejected.

        return Response()

    def _is_name_unique_in_class(self, name: str, klass: Class) -> bool:
        """Check if a user's name is unique in a class"""
        return not Student.objects.filter(
            class_field=klass, new_user__first_name__iexact=name
        ).exists()

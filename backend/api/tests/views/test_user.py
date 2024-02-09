"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

import json
import typing as t
from datetime import timedelta
from uuid import uuid4

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import (Class, School, SchoolTeacherUser,
                                     Teacher, User)
from codeforlife.user.permissions import InSchool, IsTeacher
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.utils import timezone
from rest_framework import status

from ...models import SchoolTeacherInvitation
from ...views import UserViewSet

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring
class TestUserViewSet(ModelViewSetTestCase[User]):
    basename = "user"
    model_view_set_class = UserViewSet
    fixtures = ["independent", "non_school_teacher", "school_1"]

    non_school_teacher_email = "teacher@noschool.com"
    school_teacher_email = "teacher@school1.com"
    school_admin_teacher_email = "admin.teacher@school1.com"
    school_name = "School 1"
    indy_email = "indy@man.com"

    def _login_school_teacher(self):
        return self.client.login_school_teacher(
            email=self.school_teacher_email,
            password="password",
            is_admin=False,
        )

    def _login_admin_school_teacher(self):
        return self.client.login_school_teacher(
            email=self.school_admin_teacher_email,
            password="password",
            is_admin=True,
        )

    def _get_pk_and_token_for_user(self, email: str):
        user = User.objects.get(email__iexact=email)
        token = default_token_generator.make_token(user)

        return user.pk, token

    def test_get_permissions__bulk(self):
        """
        Only school-teachers can perform bulk actions.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="bulk",
        )

    def test_get_permissions__partial_update__teacher(self):
        """
        Only admin-school-teachers can update a teacher.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="partial_update",
            request=self.client.request_factory.patch(data={"teacher": {}}),
        )

    def test_get_permissions__partial_update__student(self):
        """
        Only school-teachers can update a student.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="partial_update",
            request=self.client.request_factory.patch(data={"student": {}}),
        )

    def _invite_teacher(
        self,
        host_teacher_email: str,
        first_name: str,
        last_name: str,
        invited_teacher_email: str,
        is_admin: bool,
    ):
        host_teacher = Teacher.objects.get(
            new_user__email__iexact=host_teacher_email
        )
        token = uuid4().hex
        invitation = SchoolTeacherInvitation.objects.create(
            token=token,
            school=host_teacher.school,
            from_teacher=host_teacher,
            invited_teacher_first_name=first_name,
            invited_teacher_last_name=last_name,
            invited_teacher_email=invited_teacher_email,
            invited_teacher_is_admin=is_admin,
            expiry=timezone.now() + timedelta(days=30),
        )

        return invitation

    def test_bulk_create__students(self):
        """Teacher can bulk create students."""

        user = self._login_school_teacher()

        klass: t.Optional[Class] = user.teacher.class_teacher.first()
        assert klass is not None

        response = self.client.bulk_create(
            [
                {
                    "first_name": "Peter",
                    "student": {"klass": klass.access_code},
                },
                {
                    "first_name": "Mary",
                    "student": {"klass": klass.access_code},
                },
            ],
            make_assertions=False,
        )

        response.json()  # TODO: make custom assertions and check for password

    def test_request_password_reset__invalid_email(self):
        """
        Request password reset doesn't generate reset password URL if email
        is invalid but still returns a 200.
        """
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname,
            data={"email": "nonexistent@email.com"},
            status_code_assertion=status.HTTP_200_OK,
        )

        assert response.data is None

    def test_request_password_reset__empty_email(self):
        """Email field is required."""
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["email"] == ["Field is required."]

    def test_request_password_reset__valid_email(self):
        """
        Request password reset generates reset password URL for valid email.
        """
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname, data={"email": self.non_school_teacher_email}
        )

        assert response.data["reset_password_url"] is not None
        assert response.data["pk"] is not None
        assert response.data["token"] is not None

    def test_reset_password__invalid_pk(self):
        """Reset password raises 400 on GET with invalid pk"""
        _, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": "whatever", "token": token}
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "No user found for given ID."
        ]

    def test_reset_password__invalid_token(self):
        """Reset password raises 400 on GET with invalid token"""
        pk, _ = self._get_pk_and_token_for_user(self.non_school_teacher_email)

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": "whatever"}
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "Token doesn't match given user."
        ]

    def test_reset_password__get(self):
        """Reset password GET succeeds."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.get(viewname)

    def test_reset_password__patch__teacher(self):
        """Teacher can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.patch(viewname, data={"password": "N3wPassword!"})
        self.client.login(
            email=self.non_school_teacher_email,
            password="N3wPassword!",
        )

    def test_reset_password__patch__indy(self):
        """Indy can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(self.indy_email)

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": token},
        )

        self.client.patch(viewname, data={"password": "N3wPassword"})
        self.client.login(email=self.indy_email, password="N3wPassword")

    def test_partial_update__teacher(self):
        """
        Admin-school-teacher can update another teacher's profile.
        """

        admin_school_teacher_user = self.client.login_school_teacher(
            email="admin.teacher@school1.com",
            password="password",
            is_admin=True,
        )

        other_school_teacher_user = (
            SchoolTeacherUser.objects.filter(
                new_teacher__school=admin_school_teacher_user.teacher.school
            )
            .exclude(pk=admin_school_teacher_user.pk)
            .first()
        )
        assert other_school_teacher_user

        self.client.partial_update(
            other_school_teacher_user,
            {
                "teacher": {
                    "is_admin": not other_school_teacher_user.teacher.is_admin,
                },
            },
        )

    def test_invite_teacher__empty_first_name(self):
        """First name field is required."""
        self._login_admin_school_teacher()

        viewname = self.reverse_action("invite-teacher")

        response = self.client.post(
            viewname,
            data={"last_name": "NewTeacher", "email": "invited@teacher.com"},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
        )

        assert response.data["first_name"] == ["Field is required."]

    def test_invite_teacher__empty_last_name(self):
        """Last name field is required."""
        self._login_admin_school_teacher()

        viewname = self.reverse_action("invite-teacher")

        response = self.client.post(
            viewname,
            data={"first_name": "NewTeacher", "email": "invited@teacher.com"},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
        )

        assert response.data["last_name"] == ["Field is required."]

    def test_invite_teacher__empty_email(self):
        """Email field is required."""
        self._login_admin_school_teacher()

        viewname = self.reverse_action("invite-teacher")

        response = self.client.post(
            viewname,
            data={"first_name": "NewTeacher", "last_name": "NewTeacher"},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
        )

        assert response.data["email"] == ["Field is required."]

    def test_invite_teacher__existing_email(self):
        """
        Inviting a teacher doesn't generate a SchoolTeacherInvitation nor an
        invitation URL for a pre-existing email, but still returns a 200.
        """
        self._login_admin_school_teacher()

        viewname = self.reverse_action("invite-teacher")

        response = self.client.post(
            viewname,
            data={
                "first_name": "NewTeacher",
                "last_name": "NewTeacher",
                "email": self.school_teacher_email,
            },
            status_code_assertion=status.HTTP_200_OK,
        )

        assert response.data is None
        assert SchoolTeacherInvitation.objects.count() == 0

    def test_invite_teacher(self):
        """
        Inviting a teacher creates a SchoolTeacherInvitation, a token and URL.
        """
        self._login_admin_school_teacher()

        viewname = self.reverse_action("invite-teacher")

        response = self.client.post(
            viewname,
            data=json.dumps(
                {
                    "first_name": "NewTeacher",
                    "last_name": "NewTeacher",
                    "email": "invited@teacher.com",
                    "is_admin": "False",
                }
            ),
            status_code_assertion=status.HTTP_200_OK,
            content_type="application/json",
        )

        assert response.data["token"] is not None
        assert response.data["url"] is not None
        assert SchoolTeacherInvitation.objects.filter(
            invited_teacher_email="invited@teacher.com"
        ).exists()

    def test_accept_invite__invalid_token(self):
        """Accept invite raises 400 on GET with invalid token"""
        viewname = self.reverse_action(
            "accept-invite", kwargs={"token": "whatever"}
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "The invitation does not exist."
        ]

    def test_accept_invite__expired(self):
        """Accept invite raises 400 on GET with expired invite"""
        invitation = self._invite_teacher(
            self.school_admin_teacher_email,
            "NewTeacher",
            "NewTeacher",
            "invited@teacher.com",
            False,
        )

        invitation.expiry = timezone.now() - timedelta(days=1)
        invitation.save()

        viewname = self.reverse_action(
            "accept-invite", kwargs={"token": invitation.token}
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "The invitation has expired."
        ]

    def test_accept_invite__existing_email(self):
        """Accept invite raises 400 on GET with pre-existing email"""
        invitation = self._invite_teacher(
            self.school_admin_teacher_email,
            "NewTeacher",
            "NewTeacher",
            self.non_school_teacher_email,
            False,
        )

        viewname = self.reverse_action(
            "accept-invite", kwargs={"token": invitation.token}
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "It looks like an account is already registered with this email "
            "address. You will need to delete the other account first or "
            "change the email associated with it in order to proceed. You will "
            "then be able to access this page."
        ]

    def test_accept_invite__get(self):
        """Accept invite GET succeeds"""
        invitation = self._invite_teacher(
            self.school_admin_teacher_email,
            "NewTeacher",
            "NewTeacher",
            "invited@teacher.com",
            False,
        )

        viewname = self.reverse_action(
            "accept-invite", kwargs={"token": invitation.token}
        )

        self.client.get(viewname)

    def test_accept_invite__post(self):
        """Invited teacher can set password and their account is created"""
        invitation = self._invite_teacher(
            self.school_admin_teacher_email,
            "NewTeacher",
            "NewTeacher",
            "invited@teacher.com",
            False,
        )

        viewname = self.reverse_action(
            "accept-invite", kwargs={"token": invitation.token}
        )

        self.client.post(viewname, data={"password": "InvitedPassword1!"})

        user = self.client.login(
            email="invited@teacher.com", password="InvitedPassword1!"
        )
        assert user is not None
        assert user.teacher.school == School.objects.get(name="School 1")

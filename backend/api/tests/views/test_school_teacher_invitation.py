"""
© Ocado Group
Created on 09/02/2024 at 17:18:00(+00:00).
"""

from datetime import timedelta

from codeforlife.permissions import AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import School, Teacher
from codeforlife.user.permissions import InSchool, IsTeacher
from django.contrib.auth.hashers import make_password
from django.utils import timezone
from django.utils.crypto import get_random_string
from rest_framework import status

from ...models import SchoolTeacherInvitation
from ...views import SchoolTeacherInvitationViewSet


# pylint: disable-next=missing-class-docstring
class TestSchoolTeacherInvitationViewSet(
    ModelViewSetTestCase[SchoolTeacherInvitation]
):
    basename = "school-teacher-invitation"
    model_view_set_class = SchoolTeacherInvitationViewSet
    fixtures = ["non_school_teacher", "school_1"]
    school_admin_teacher_email = "admin.teacher@school1.com"
    non_school_teacher_email = "teacher@noschool.com"

    def _login_admin_school_teacher(self):
        return self.client.login_school_teacher(
            email="admin.teacher@school1.com",
            password="password",
            is_admin=True,
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

        token = get_random_string(length=32)

        invitation = SchoolTeacherInvitation.objects.create(
            token=make_password(token),
            school=host_teacher.school,
            from_teacher=host_teacher,
            invited_teacher_first_name=first_name,
            invited_teacher_last_name=last_name,
            invited_teacher_email=invited_teacher_email,
            invited_teacher_is_admin=is_admin,
            expiry=timezone.now() + timedelta(days=30),
        )

        invitation._token = token

        return invitation

    def setUp(self):
        self.invitation = SchoolTeacherInvitation.objects.get(pk=1)

    def test_get_permissions__bulk(self):
        """No one is allowed to perform bulk actions."""

        self.assert_get_permissions(
            permissions=[AllowNone()],
            action="bulk",
        )

    def test_get_permissions__create(self):
        """Only admin-teachers can create an invitation."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="create",
        )

    def test_get_permissions__partial_update(self):
        """Only admin-teachers can update an invitation."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="partial_update",
        )

    def test_get_permissions__retrieve(self):
        """Only admin-teachers can retrieve an invitation."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="retrieve",
        )

    def test_get_permissions__destroy(self):
        """Only admin-teachers can destroy an invitation."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="destroy",
        )

    def test_create(self):
        """Can successfully create an invitation."""

        self._login_admin_school_teacher()

        self.client.create(
            {
                "first_name": "Invited",
                "last_name": "Teacher",
                "email": "invited@teacher.com",
                "is_admin": "False",
            },
        )

    def test_partial_update(self):
        """Can successfully update an invitation's expiry."""

        self._login_admin_school_teacher()

        invitation = SchoolTeacherInvitation.objects.get(pk=1)

        assert invitation.is_expired

        self.client.partial_update(invitation, {})

        invitation.refresh_from_db()

        assert not invitation.is_expired

    def test_destroy(self):
        """Can successfully destroy an invitation."""

        self._login_admin_school_teacher()

        invitation = SchoolTeacherInvitation.objects.get(pk=1)

        self.client.destroy(invitation)

        assert not SchoolTeacherInvitation.objects.filter(pk=1).exists()

    def test_accept__invalid_token(self):
        """Accept invite raises 400 on GET with invalid token"""

        invitation = self._invite_teacher(
            host_teacher_email=self.school_admin_teacher_email,
            first_name="NewTeacher",
            last_name="NewTeacher",
            invited_teacher_email=self.non_school_teacher_email,
            is_admin=False,
        )

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "whatever"},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == ["Incorrect token."]

    def test_accept__expired(self):
        """Accept invite raises 400 on GET with expired invite"""

        invitation = self._invite_teacher(
            host_teacher_email=self.school_admin_teacher_email,
            first_name="NewTeacher",
            last_name="NewTeacher",
            invited_teacher_email="invited@teacher.com",
            is_admin=False,
        )

        invitation.expiry = timezone.now() - timedelta(days=1)
        invitation.save()

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": invitation._token},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "The invitation has expired."
        ]

    def test_accept__existing_email(self):
        """Accept invite raises 400 on GET with pre-existing email"""

        invitation = self._invite_teacher(
            host_teacher_email=self.school_admin_teacher_email,
            first_name="NewTeacher",
            last_name="NewTeacher",
            invited_teacher_email="teacher@school1.com",
            is_admin=False,
        )

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": invitation._token},
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

    def test_accept__get(self):
        """Accept invite GET succeeds"""

        invitation = self._invite_teacher(
            host_teacher_email=self.school_admin_teacher_email,
            first_name="NewTeacher",
            last_name="NewTeacher",
            invited_teacher_email="invited@teacher.com",
            is_admin=False,
        )

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": invitation._token},
        )

        self.client.get(viewname)

    def test_accept__post(self):
        """Invited teacher can set password and their account is created"""

        email, password = "invited@teacher.com", "InvitedPassword1!"

        invitation = self._invite_teacher(
            host_teacher_email=self.school_admin_teacher_email,
            first_name="NewTeacher",
            last_name="NewTeacher",
            invited_teacher_email=email,
            is_admin=False,
        )

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": invitation._token},
        )

        self.client.post(viewname, data={"password": password}, format="json")

        user = self.client.login(email=email, password=password)
        assert user.teacher.school == invitation.school
        assert user.teacher.is_admin == invitation.invited_teacher_is_admin

        with self.assertRaises(invitation.DoesNotExist):
            invitation.refresh_from_db()

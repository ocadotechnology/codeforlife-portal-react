"""
© Ocado Group
Created on 09/02/2024 at 17:18:00(+00:00).
"""

from datetime import timedelta

from codeforlife.permissions import AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import AdminSchoolTeacher, School, Teacher
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
            email=self.school_admin_teacher_email,
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
        host_teacher = AdminSchoolTeacher.objects.get(
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
        self.expired_invitation = SchoolTeacherInvitation.objects.get(pk=1)
        self.invalid_token_invitation = SchoolTeacherInvitation.objects.get(
            pk=2
        )
        self.valid_invitation = SchoolTeacherInvitation.objects.get(pk=3)
        self.existing_teacher_invitation = SchoolTeacherInvitation.objects.get(
            pk=4
        )

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

    def test_get_permissions__list(self):
        """Only admin-teachers can list invitations."""
        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="list",
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

        invitation = self.expired_invitation

        self.client.partial_update(invitation, {})

        invitation.refresh_from_db()

        assert not invitation.is_expired

    def test_destroy(self):
        """Can successfully destroy an invitation."""
        self._login_admin_school_teacher()

        invitation = self.valid_invitation

        self.client.destroy(invitation)

        with self.assertRaises(invitation.DoesNotExist):
            invitation.refresh_from_db()

    def test_accept__get__invalid_token(self):
        """Accept invite raises 400 on GET with invalid token"""
        invitation = self.invalid_token_invitation

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "token"},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == ["Incorrect token."]

    def test_accept__get__expired(self):
        """Accept invite raises 400 on GET with expired invite"""
        invitation = self.expired_invitation

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "token"},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "The invitation has expired."
        ]

    def test_accept__get__existing_email(self):
        """Accept invite raises 400 on GET with pre-existing email"""
        invitation = self.existing_teacher_invitation

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "token"},
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
        invitation = self.valid_invitation

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "token"},
        )

        self.client.get(viewname)

    def test_accept__post(self):
        """Invited teacher can set password and their account is created"""
        password = "InvitedPassword1!"

        invitation = self.valid_invitation

        viewname = self.reverse_action(
            "accept",
            # pylint: disable-next=protected-access
            kwargs={"pk": invitation.pk, "token": "token"},
        )

        self.client.post(
            viewname, data={"password": "InvitedPassword1!"}, format="json"
        )

        user = self.client.login(
            email=invitation.invited_teacher_email,
            password=password,
        )
        assert user.teacher.school == invitation.school
        assert user.teacher.is_admin == invitation.invited_teacher_is_admin

        with self.assertRaises(invitation.DoesNotExist):
            invitation.refresh_from_db()

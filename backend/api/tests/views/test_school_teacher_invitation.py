"""
© Ocado Group
Created on 09/02/2024 at 17:18:00(+00:00).
"""

from datetime import timedelta

from codeforlife.permissions import NOT, AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.permissions import InSchool, IsTeacher
from django.utils import timezone

from ...models import SchoolTeacherInvitation
from ...views import SchoolTeacherInvitationViewSet


# pylint: disable-next=missing-class-docstring
class TestSchoolTeacherInvitationViewSet(
    ModelViewSetTestCase[SchoolTeacherInvitation]
):
    basename = "school_teacher_invitation"
    model_view_set_class = SchoolTeacherInvitationViewSet
    fixtures = ["school_1"]

    def _login_admin_school_teacher(self):
        return self.client.login_school_teacher(
            email="admin.teacher@school1.com",
            password="password",
            is_admin=True,
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

    def test_get_permissions__update(self):
        """Only admin-teachers can update an invitation."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="update",
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

        user = self._login_admin_school_teacher()

        self.client.create(
            {
                "token": "whatever",
                "school": user.teacher.school,
                "from_teacher": user.teacher,
                "invited_teacher_first_name": "Invited",
                "invited_teacher_last_name": "Teacher",
                "invited_teacher_email": "invited@teacher.com",
                "invited_teacher_is_admin": "False",
                "expiry": timezone.now() + timedelta(days=30),
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

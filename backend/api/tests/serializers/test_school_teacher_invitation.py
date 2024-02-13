"""
© Ocado Group
Created on 13/02/2024 at 13:44:00(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, AdminSchoolTeacherUser, Teacher

from ...serializers import SchoolTeacherInvitationSerializer
from ...models import SchoolTeacherInvitation


# pylint: disable-next=missing-class-docstring
class TestSchoolTeacherInvitationSerializer(
    ModelSerializerTestCase[SchoolTeacherInvitation]
):
    model_serializer_class = SchoolTeacherInvitationSerializer
    fixtures = ["school_1"]

    def setUp(self):
        self.admin_school_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school1.com"
        )
        self.invitation = SchoolTeacherInvitation.objects.get(pk=1)

    def test_create(self):
        """
        Can successfully create.
        """

        self.assert_create(
            {
                "invited_teacher_first_name": "NewTeacher",
                "invited_teacher_last_name": "NewTeacher",
                "invited_teacher_email": "invited@teacher.com",
                "invited_teacher_is_admin": False,
            },
            context={
                "request": self.request_factory.post(
                    user=self.admin_school_teacher_user
                )
            },
        )

    def test_update(self):
        """
        Can successfully update.
        """

        self.assert_update(
            self.invitation,
            {},
            context={
                "request": self.request_factory.post(
                    user=self.admin_school_teacher_user
                )
            },
        )

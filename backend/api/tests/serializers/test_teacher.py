"""
© Ocado Group
Created on 08/02/2024 at 13:01:42(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import (
    AdminSchoolTeacherUser,
    SchoolTeacherUser,
    StudentUser,
    Teacher,
)

from ...serializers import TeacherSerializer, UserSerializer


# pylint: disable-next=missing-class-docstring
class TestTeacherSerializer(ModelSerializerTestCase[Teacher]):
    model_serializer_class = TeacherSerializer
    fixtures = ["school_1", "school_2"]

    def setUp(self):
        self.admin_school_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school1.com",
        )
        assert self.admin_school_teacher_user

    def test_validate_is_admin__is_self(self):
        """
        Teacher cannot update own permissions.
        """

        self.assert_validate_field(
            name="is_admin",
            value=True,
            error_code="is_self",
            parent=UserSerializer(
                instance=self.admin_school_teacher_user,
                context={
                    "request": self.request_factory.patch(
                        user=self.admin_school_teacher_user
                    ),
                },
            ),
        )

    def test_validate__not_teacher(self):
        """
        Target user must be a teacher.
        """

        student_user = StudentUser.objects.first()
        assert student_user

        self.assert_validate(
            attrs={},
            error_code="not_teacher",
            parent=UserSerializer(instance=student_user),
        )

    def test_validate__not_in_school(self):
        """
        Teacher cannot update own permissions.
        """

        school_teacher_user = SchoolTeacherUser.objects.exclude(
            new_teacher__school=self.admin_school_teacher_user.teacher.school
        ).first()
        assert school_teacher_user

        self.assert_validate(
            attrs={},
            error_code="not_in_school",
            parent=UserSerializer(
                instance=school_teacher_user,
                context={
                    "request": self.request_factory.patch(
                        user=self.admin_school_teacher_user
                    ),
                },
            ),
        )

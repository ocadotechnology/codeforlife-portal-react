"""
© Ocado Group
Created on 05/02/2024 at 15:31:59(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, NonAdminSchoolTeacherUser, Teacher

from ...serializers.klass import ClassSerializer


# pylint: disable-next=missing-class-docstring
class TestClassSerializer(ModelSerializerTestCase[Class]):
    model_serializer_class = ClassSerializer
    fixtures = ["school_1", "school_2"]

    def setUp(self):
        self.non_admin_school_1_teacher_user = (
            NonAdminSchoolTeacherUser.objects.get(email="teacher@school1.com")
        )
        self.non_admin_school_2_teacher_user = (
            NonAdminSchoolTeacherUser.objects.get(email="teacher@school2.com")
        )
        self.class_1_at_school_1 = Class.objects.get(name="Class 1 @ School 1")

    def test_validate_teacher__not_in_school(self):
        """Teacher must be in school."""
        self.assert_validate_field(
            name="teacher",
            value=self.non_admin_school_2_teacher_user.teacher,
            error_code="not_in_school",
            context={
                "request": self.request_factory.post(
                    user=self.non_admin_school_1_teacher_user
                )
            },
        )

    def test_validate_teacher__not_admin(self):
        """Teacher cannot assign another teacher if they're not an admin."""
        teacher = (
            Teacher.objects.filter(
                school=self.non_admin_school_1_teacher_user.teacher.school
            )
            .exclude(pk=self.non_admin_school_1_teacher_user.teacher.pk)
            .first()
        )
        assert teacher

        self.assert_validate_field(
            name="teacher",
            value=teacher,
            error_code="not_admin",
            context={
                "request": self.request_factory.post(
                    user=self.non_admin_school_1_teacher_user
                )
            },
        )

    def test_validate_name__name_not_unique(self):
        """Class names must be unique per school."""
        self.assert_validate_field(
            name="name",
            value=self.class_1_at_school_1.name,
            error_code="name_not_unique",
            context={
                "request": self.request_factory.post(
                    user=self.non_admin_school_1_teacher_user
                )
            },
        )

    def test_create__teacher(self):
        """Can successfully create with setting the teacher field."""
        self.assert_create(
            {
                "name": "ExampleClass",
                "teacher": self.non_admin_school_1_teacher_user.teacher,
                "classmates_data_viewable": False,
            }
        )

    def test_create__no_teacher(self):
        """Can successfully create without setting the teacher field."""
        self.assert_create(
            {
                "name": "ExampleClass",
                "classmates_data_viewable": False,
            },
            new_data={
                "teacher": self.non_admin_school_1_teacher_user.teacher,
            },
            context={
                "request": self.request_factory.post(
                    user=self.non_admin_school_1_teacher_user
                ),
            },
        )

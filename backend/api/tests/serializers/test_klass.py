"""
© Ocado Group
Created on 05/02/2024 at 15:31:59(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, SchoolTeacherUser, Teacher

from ...serializers import ClassSerializer


# pylint: disable-next=missing-class-docstring
class TestClassSerializer(ModelSerializerTestCase[Class]):
    model_serializer_class = ClassSerializer
    fixtures = ["school_1"]

    def setUp(self):
        self.school_teacher_user = SchoolTeacherUser.objects.get(
            email="teacher@school1.com"
        )
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")

    def test_validate_teacher__does_not_exist(self):
        """Teacher must exist."""
        self.assert_validate_field(
            name="teacher",
            value=-1,
            error_code="does_not_exist",
        )

    def test_validate_teacher__not_in_school(self):
        """Teacher must be in school."""
        teacher = Teacher.objects.exclude(
            school=self.school_teacher_user.teacher.school
        ).first()
        assert teacher

        self.assert_validate_field(
            name="teacher",
            value=teacher.id,
            error_code="not_in_school",
            context={
                "request": self.request_factory.post(
                    user=self.school_teacher_user
                )
            },
        )

    def test_validate_teacher__not_admin(self):
        """Teacher cannot assign another teacher if they're not an admin."""
        assert not self.school_teacher_user.teacher.is_admin

        teacher = (
            Teacher.objects.filter(
                school=self.school_teacher_user.teacher.school
            )
            .exclude(pk=self.school_teacher_user.teacher.pk)
            .first()
        )
        assert teacher

        self.assert_validate_field(
            name="teacher",
            value=teacher.id,
            error_code="not_admin",
            context={
                "request": self.request_factory.post(
                    user=self.school_teacher_user
                )
            },
        )

    def test_validate_name__name_not_unique(self):
        """Class names must be unique per school."""
        self.assert_validate_field(
            name="name",
            value=self.class_1.name,
            error_code="name_not_unique",
            context={
                "request": self.request_factory.post(
                    user=self.school_teacher_user
                )
            },
        )

    def test_create__teacher(self):
        """Can successfully create with setting the teacher field."""
        self.assert_create(
            {
                "name": "ExampleClass",
                "teacher": {
                    "id": self.school_teacher_user.teacher.id,
                },
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
                "teacher": self.school_teacher_user.teacher.id,
            },
            context={
                "request": self.request_factory.post(
                    user=self.school_teacher_user
                ),
            },
        )

"""
© Ocado Group
Created on 05/02/2024 at 15:31:59(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, SchoolTeacherUser

from ...serializers import ClassSerializer


# pylint: disable-next=missing-class-docstring
class ClassSerializerTestCase(ModelSerializerTestCase[Class]):
    model_serializer_class = ClassSerializer
    fixtures = ["school_1"]

    def setUp(self):
        self.school_teacher_user = SchoolTeacherUser.objects.get(
            email="teacher@school1.com"
        )
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")

    def test_validate_name__name_not_unique(self):
        """
        Class names must be unique per school.
        """

        self.assert_validate_field(
            name="name",
            value=self.class_1.name,
            error_code="name_not_unique",
            user=self.school_teacher_user,
        )

    def test_create(self):
        """
        Creates an instance of the Class model.
        """

        self.assert_create(
            {
                "name": "ExampleClass",
                "teacher": {
                    "id": self.school_teacher_user.teacher.id,
                    "school": {
                        "id": self.school_teacher_user.teacher.school.id,
                    },
                },
                "classmates_data_viewable": False,
            }
        )

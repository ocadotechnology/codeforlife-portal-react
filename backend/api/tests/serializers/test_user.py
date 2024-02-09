"""
© Ocado Group
Created on 31/01/2024 at 16:07:32(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, Student, User

from ...serializers import UserSerializer


# pylint: disable-next=missing-class-docstring
class TestUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = UserSerializer
    fixtures = ["school_1"]

    def test_validate__first_name_not_unique_per_class_in_data(self):
        """
        First name must be unique per class in data.
        """

        self.assert_validate(
            attrs=[
                {
                    "first_name": "Peter",
                    "new_student": {
                        "class_field": {
                            "access_code": "ZZ111",
                        },
                    },
                },
                {
                    "first_name": "Peter",
                    "new_student": {
                        "class_field": {
                            "access_code": "ZZ111",
                        },
                    },
                },
            ],
            error_code="first_name_not_unique_per_class_in_data",
            many=True,
        )

    def test_validate__first_name_not_unique_per_class_in_db(self):
        """
        First name must be unique per class in database.
        """

        klass = Class.objects.get(name="Class 1 @ School 1")
        assert klass is not None

        student = Student.objects.filter(class_field=klass).first()
        assert student is not None

        self.assert_validate(
            attrs=[
                {
                    "first_name": student.new_user.first_name,
                    "new_student": {
                        "class_field": {
                            "access_code": klass.access_code,
                        },
                    },
                },
            ],
            error_code="first_name_not_unique_per_class_in_db",
            many=True,
        )

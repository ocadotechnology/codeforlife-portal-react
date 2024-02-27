"""
© Ocado Group
Created on 31/01/2024 at 16:07:32(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, Student, StudentUser, User

from ...serializers import (
    ReleaseStudentUserSerializer,
    TransferStudentUserSerializer,
    UserSerializer,
)

# pylint: disable=missing-class-docstring


class TestUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = UserSerializer
    fixtures = ["school_1"]

    def test_validate__first_name_not_unique_per_class_in_data(self):
        """First name must be unique per class in data."""
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
        """First name must be unique per class in database."""
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


class TestReleaseStudentUserSerializer(ModelSerializerTestCase[StudentUser]):
    model_serializer_class = ReleaseStudentUserSerializer
    fixtures = ["school_1"]

    def setUp(self):
        student_user = StudentUser.objects.first()
        assert student_user
        self.student_user = student_user

    def test_validate_email__already_exists(self):
        """Cannot release a student with an email that already exists."""
        user_fields = User.objects.values("email").first()
        assert user_fields

        self.assert_validate_field(
            "email", user_fields["email"], error_code="already_exists"
        )

    def test_update(self):
        """The student-user is converted in an independent-user."""
        self.assert_update_many(
            instance=[self.student_user],
            validated_data=[{"email": f"{self.student_user.pk}@email.com"}],
            new_data=[{"student": {"class_field": None}}],
        )


class TestTransferStudentUserSerializer(ModelSerializerTestCase[StudentUser]):
    model_serializer_class = TransferStudentUserSerializer
    fixtures = ["school_1"]

    def setUp(self):
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")
        self.class_2 = Class.objects.get(name="Class 2 @ School 1")

        # TODO: make this a property of Class in new data schema.
        self.class_1_student_users = StudentUser.objects.filter(
            new_student__in=self.class_1.students.all()
        )

    def test_update(self):
        """The student-user is transferred to another class."""
        self.assert_update_many(
            instance=list(self.class_1_student_users),
            validated_data=[
                {
                    "new_student": {
                        "class_field": {
                            "access_code": self.class_2.access_code,
                        }
                    }
                }
                for _ in range(self.class_1.students.count())
            ],
        )

"""
© Ocado Group
Created on 31/01/2024 at 16:07:32(+00:00).
"""
from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, IndependentUser, Student, User

from ...serializers import UserSerializer


# pylint: disable-next=missing-class-docstring
class TestUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = UserSerializer
    fixtures = ["independent", "school_1"]

    def setUp(self):
        self.independent = IndependentUser.objects.get(email="indy@man.com")
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")
        self.class_3 = Class.objects.get(name="Class 3 @ School 1")

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

    def test_validate__teacher__first_name_required(self):
        """Teacher must have a first name"""
        self.assert_validate(
            attrs={"new_teacher": {}}, error_code="last_name_required"
        )

    def test_validate__teacher__requesting_to_join_class_forbidden(self):
        """Teacher cannot request to join a class"""
        self.assert_validate(
            attrs={
                "last_name": "Name",
                "new_teacher": {},
                "requesting_to_join_class": "AAAAA",
            },
            error_code="teacher_cannot_request_to_join_class",
        )

    def test_validate__student__requesting_to_join_class_and_class_field_forbidden(
        self,
    ):
        """Student cannot have both requesting_to_join_class and class_field"""
        self.assert_validate(
            attrs={
                "new_student": {"class_field": "AAAAA"},
                "requesting_to_join_class": "BBBBB",
            },
            error_code="class_and_join_class_mutually_exclusive",
        )

    def test_validate_requesting_to_join_class__does_not_exist(self):
        """Join class request cannot be for a class that doesn't exist"""
        self.assert_validate_field(
            name="requesting_to_join_class",
            value="AAAAA",
            error_code="does_not_exist_or_accept_join_requests",
        )

    def test_validate_requesting_to_join_class__does_not_accept_requests(self):
        """
        Join class request cannot be for a class that doesn't accept requests
        """
        self.assert_validate_field(
            name="requesting_to_join_class",
            value=self.class_1.access_code,
            error_code="does_not_exist_or_accept_join_requests",
        )

    def test_validate_requesting_to_join_class__no_longer_accept_requests(self):
        """
        Join class request cannot be for a class that no longer accepts requests
        """
        self.assert_validate_field(
            name="requesting_to_join_class",
            value=self.class_3.access_code,
            error_code="does_not_exist_or_accept_join_requests",
        )

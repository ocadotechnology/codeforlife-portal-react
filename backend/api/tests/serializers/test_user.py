"""
© Ocado Group
Created on 31/01/2024 at 16:07:32(+00:00).
"""
from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import (
    AdminSchoolTeacherUser,
    Class,
    IndependentUser,
    Student,
    StudentUser,
    User,
)

from ...serializers import (
    HandleIndependentUserJoinClassRequestSerializer,
    ReleaseStudentUserSerializer,
    UserSerializer,
)

# pylint: disable=missing-class-docstring


class TestUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = UserSerializer
    fixtures = ["independent", "school_1"]

    def setUp(self):
        self.independent = IndependentUser.objects.get(
            email="indy.requester@email.com"
        )
        self.admin_school_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school1.com",
        )
        self.class_2 = Class.objects.get(name="Class 2 @ School 1")
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

    def test_validate__create__teacher__last_name_required(self):
        """Teacher's last name is required during creation."""
        self.assert_validate(
            attrs={"new_teacher": {}}, error_code="last_name__required"
        )

    def test_validate__create__teacher__requesting_to_join_class(self):
        """Teacher cannot request to join a class on creation."""
        self.assert_validate(
            attrs={
                "last_name": "Name",
                "new_teacher": {},
                "requesting_to_join_class": "AAAAA",
            },
            error_code="requesting_to_join_class__teacher",
        )

    def test_validate__update__teacher__requesting_to_join_class(self):
        """Teacher cannot request to join a class on update."""
        self.assert_validate(
            attrs={
                "last_name": "Name",
                "new_teacher": {},
                "requesting_to_join_class": "AAAAA",
            },
            error_code="requesting_to_join_class__teacher",
            parent=UserSerializer(
                instance=self.admin_school_teacher_user,
                context={
                    "request": self.request_factory.patch(
                        user=self.admin_school_teacher_user
                    ),
                },
            ),
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
        """Student cannot request to join a class which doesn't exist."""
        self.assert_validate_field(
            name="requesting_to_join_class",
            value="AAAAA",
            error_code="does_not_exist",
        )

    def test_validate_requesting_to_join_class__does_not_accept_requests(self):
        """
        Student cannot request to join a class which doesn't accept requests.
        """
        self.assert_validate_field(
            name="requesting_to_join_class",
            value=self.class_2.access_code,
            error_code="does_not_accept_requests",
        )

    def test_validate_requesting_to_join_class__no_longer_accepts_requests(
        self,
    ):
        """
        Student cannot request to join a class which no longer accepts requests.
        """
        self.assert_validate_field(
            name="requesting_to_join_class",
            value=self.class_3.access_code,
            error_code="no_longer_accepts_requests",
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


class TestHandleIndependentUserJoinClassRequestSerializer(
    ModelSerializerTestCase[IndependentUser]
):
    model_serializer_class = HandleIndependentUserJoinClassRequestSerializer
    fixtures = ["independent", "school_1", "school_2"]

    def setUp(self):
        indy_user = IndependentUser.objects.get(
            email="indy.requester@email.com"
        )
        assert indy_user
        self.indy_user = indy_user
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")

    def test_validate_first_name(self):
        """Cannot accept a new student into a class with a duplicate name."""
        user_fields = (
            StudentUser.objects.filter(new_student__class_field=self.class_1)
            .values("first_name")
            .first()
        )
        assert user_fields

        self.assert_validate_field(
            "first_name",
            user_fields["first_name"],
            error_code="already_in_class",
            instance=self.indy_user,
        )

    def test_update(self):
        """The indy-user becomes a student-user."""
        self.assert_update(
            self.indy_user,
            {"accept": True},
            new_data={
                "last_name": "",
                "email": "",
                "student": {
                    "pending_class_request": None,
                    "class_field": self.class_1.pk,
                },
            },
            non_model_fields=["accept"],
        )

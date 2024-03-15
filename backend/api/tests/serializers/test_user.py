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

from ...serializers.user import BaseUserSerializer, UserSerializer
from ...views import UserViewSet

# pylint: disable=missing-class-docstring


class TestBaseUserSerializer(ModelSerializerTestCase[User]):
    model_serializer_class = BaseUserSerializer[User]
    # fixtures = ["school_1"]

    def test_validate_email__already_exists(self):
        """Cannot assign a user an email that already exists."""
        user_fields = User.objects.values("email").first()
        assert user_fields

        self.assert_validate_field(
            "email", user_fields["email"], error_code="already_exists"
        )

    def test_validate_password(self):
        """
        Password is validated using django's installed password-validators.
        """
        raise NotImplementedError()  # TODO

    def test_update(self):
        """Updating a user's password saves the password's hash."""
        raise NotImplementedError()  # TODO


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
        self.student_user = StudentUser.objects.get(first_name="Student1")
        self.class_2 = Class.objects.get(name="Class 2 @ School 1")
        self.class_3 = Class.objects.get(name="Class 3 @ School 1")

    def test_validate__student__is_teacher(self):
        """Teacher cannot update student fields."""
        self.assert_validate(
            attrs={"new_student": {}},
            error_code="student__is_teacher",
            instance=self.admin_school_teacher_user,
        )

    def test_validate__teacher__is_student(self):
        """Student cannot update teacher fields."""
        self.assert_validate(
            attrs={"new_teacher": {}},
            error_code="teacher__is_student",
            instance=self.student_user,
        )

    def test_validate__create__teacher_and_student(self):
        """Cannot create a user with both teacher and student attributes."""
        self.assert_validate(
            attrs={"new_teacher": {}, "new_student": {}},
            error_code="teacher_and_student",
        )

    def test_validate__create__teacher__last_name__required(self):
        """Teacher's last name is required during creation."""
        self.assert_validate(
            attrs={"new_teacher": {}}, error_code="last_name__required"
        )

    def test_validate__requesting_to_join_class__create__in_class(
        self,
    ):
        """
        Student cannot have both requesting_to_join_class and class_field on
        creation.
        """
        self.assert_validate(
            attrs={
                "new_student": {
                    "class_field": "AAAAA",
                    "pending_class_request": "BBBBB",
                }
            },
            error_code="requesting_to_join_class__create__in_class",
        )

    def test_validate__requesting_to_join_class__update__in_class(
        self,
    ):
        """Student cannot be updated to request to join a class."""
        self.assert_validate(
            attrs={
                "new_student": {"pending_class_request": "BBBBB"},
            },
            error_code="requesting_to_join_class__update__in_class",
            instance=self.student_user,
            context={
                "view": UserViewSet(action="partial_update"),
                "request": self.request_factory.patch(
                    user=self.admin_school_teacher_user
                ),
            },
        )

    def test_validate__class_field__update__requesting_to_join_class(
        self,
    ):
        """
        Independent user with a pending join class request cannot also be
        updated to have a class.
        """
        self.assert_validate(
            attrs={
                "new_student": {"class_field": "AAAAA"},
            },
            error_code="class_field__update__requesting_to_join_class",
            instance=self.independent,
            context={
                "view": UserViewSet(action="partial_update"),
                "request": self.request_factory.patch(user=self.independent),
            },
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

    def test_validate(self):
        """Current password is required when editing a user's data."""
        raise NotImplementedError()  # TODO

    def test_create(self):
        """Can successfully create an independent user."""
        raise NotImplementedError()  # TODO

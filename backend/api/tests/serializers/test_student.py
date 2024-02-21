"""
© Ocado Group
Created on 30/01/2024 at 19:03:45(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import (
    Class,
    IndependentUser,
    NonSchoolTeacherUser,
    SchoolTeacherUser,
    Student,
    TeacherUser,
)

from ...serializers import StudentSerializer, UserSerializer


# pylint: disable-next=missing-class-docstring
class TestStudentSerializer(ModelSerializerTestCase[Student]):
    model_serializer_class = StudentSerializer
    fixtures = [
        "independent",
        "non_school_teacher",
        "school_1",
        "school_2",
    ]

    def setUp(self):
        self.independent = IndependentUser.objects.get(email="indy@man.com")
        self.class_1 = Class.objects.get(name="Class 1 @ School 1")
        self.class_3 = Class.objects.get(name="Class 3 @ School 1")

    def test_validate_klass__does_not_exist(self):
        """
        Requesting teacher cannot assign a student to a class that doesn't
        exist.
        """
        user = SchoolTeacherUser.objects.get(email="teacher@school1.com")

        self.assert_validate_field(
            name="klass",
            value="",
            error_code="does_not_exist",
            parent=UserSerializer(
                context={"request": self.request_factory.post(user=user)}
            ),
        )

    def test_validate_klass__teacher_not_in_same_school(self):
        """
        Requesting teacher cannot assign a student to a class if they're not in
        the same school.
        """
        user = SchoolTeacherUser.objects.get(email="teacher@school1.com")

        klass = Class.objects.exclude(
            teacher__school=user.teacher.school
        ).first()
        assert klass is not None

        self.assert_validate_field(
            name="klass",
            value=klass.access_code,
            error_code="teacher_not_in_same_school",
            parent=UserSerializer(
                context={"request": self.request_factory.post(user=user)}
            ),
        )

    def test_validate_klass__teacher_not_admin_or_class_owner(self):
        """
        Requesting teacher cannot assign a student to a class if they're not an
        admin or they don't own the class.
        """
        user = SchoolTeacherUser.objects.get(email="teacher@school1.com")
        assert not user.teacher.is_admin

        klass = (
            Class.objects.filter(teacher__school=user.teacher.school)
            .exclude(teacher=user.teacher)
            .first()
        )
        assert klass is not None

        self.assert_validate_field(
            name="klass",
            value=klass.access_code,
            error_code="teacher_not_admin_or_class_owner",
            parent=UserSerializer(
                context={"request": self.request_factory.post(user=user)}
            ),
        )

    def test_validate_pending_class_request__does_not_exist(self):
        """Join class request cannot be for a class that doesn't exist"""
        self.assert_validate_field(
            name="pending_class_request",
            value="AAAAA",
            error_code="does_not_exist_or_accept_join_requests",
        )

    def test_validate_pending_class_request__does_not_accept_requests(self):
        """
        Join class request cannot be for a class that doesn't accept requests
        """
        self.assert_validate_field(
            name="pending_class_request",
            value=self.class_1.access_code,
            error_code="does_not_exist_or_accept_join_requests",
        )

    def test_validate_pending_class_request__no_longer_accept_requests(self):
        """
        Join class request cannot be for a class that no longer accepts requests
        """
        self.assert_validate_field(
            name="pending_class_request",
            value=self.class_3.access_code,
            error_code="does_not_exist_or_accept_join_requests",
        )

    def test_validate__not_student(self):
        """Target user must be a student."""
        teacher_user = TeacherUser.objects.first()
        assert teacher_user

        self.assert_validate(
            attrs={},
            error_code="not_student",
            parent=UserSerializer(instance=teacher_user),
        )
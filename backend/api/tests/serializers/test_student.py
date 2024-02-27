"""
© Ocado Group
Created on 30/01/2024 at 19:03:45(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import (
    Class,
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
        "non_school_teacher",
        "school_1",
        "school_2",
    ]

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

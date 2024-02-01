"""
© Ocado Group
Created on 30/01/2024 at 19:03:45(+00:00).
"""

from codeforlife.tests import ModelSerializerTestCase
from codeforlife.user.models import Class, Student, User

from ...serializers import StudentSerializer


# pylint: disable-next=missing-class-docstring
class StudentSerializerTestCase(ModelSerializerTestCase[Student]):
    model_serializer_class = StudentSerializer
    fixtures = [
        "non_school_teacher",
        "school_1",
        "school_2",
    ]

    def test_validate_klass__teacher_not_in_school(self):
        """
        Requesting teacher cannot assign a student to a class if they're not in
        a school.
        """

        user = User.objects.get(email="teacher@noschool.com")
        assert user.teacher and not user.teacher.school

        self.assert_validate_field(
            name="klass",
            value="",
            error_code="teacher_not_in_school",
            user=user,
        )

    def test_validate_klass__does_not_exist(self):
        """
        Requesting teacher cannot assign a student to a class that doesn't
        exist.
        """

        user = User.objects.get(email="teacher@school1.com")
        assert user.teacher and user.teacher.school

        self.assert_validate_field(
            name="klass",
            value="",
            error_code="does_not_exist",
            user=user,
        )

    def test_validate_klass__teacher_not_in_same_school(self):
        """
        Requesting teacher cannot assign a student to a class if they're not in
        the same school.
        """

        user = User.objects.get(email="teacher@school1.com")
        assert user.teacher and user.teacher.school

        klass = Class.objects.exclude(
            teacher__school=user.teacher.school
        ).first()
        assert klass is not None

        self.assert_validate_field(
            name="klass",
            value=klass.access_code,
            error_code="teacher_not_in_same_school",
            user=user,
        )

    def test_validate_klass__teacher_not_admin_or_class_owner(self):
        """
        Requesting teacher cannot assign a student to a class if they're not an
        admin or they don't own the class.
        """

        user = User.objects.get(email="teacher@school1.com")
        assert (
            user.teacher and user.teacher.school and not user.teacher.is_admin
        )

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
            user=user,
        )

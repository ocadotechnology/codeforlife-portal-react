"""
© Ocado Group
Created on 05/02/2024 at 16:13:46(+00:00).
"""

from datetime import timedelta

from codeforlife.permissions import OR, AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, Teacher
from codeforlife.user.permissions import IsStudent, IsTeacher
from django.utils import timezone

from ...views import ClassViewSet


# pylint: disable-next=missing-class-docstring
class TestClassViewSet(ModelViewSetTestCase[Class]):
    basename = "class"
    model_view_set_class = ClassViewSet
    fixtures = ["school_1"]

    # test: get permissions

    def test_get_permissions__bulk(self):
        """No one is allowed to perform bulk actions."""
        self.assert_get_permissions(
            permissions=[AllowNone()],
            action="bulk",
        )

    def test_get_permissions__create(self):
        """Only school-teachers can create a class."""
        self.assert_get_permissions(
            permissions=[IsTeacher(in_school=True)],
            action="create",
        )

    def test_get_permissions__update(self):
        """Only admin-teachers or class-teachers can update a class."""
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="update",
        )

    def test_get_permissions__destroy(self):
        """Only admin-teachers or class-teachers can destroy a class."""
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="destroy",
        )

    def test_get_permissions__list(self):
        """Only admin-teachers and class-teachers can list classes."""
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="list",
        )

    def test_get_permissions__retrieve(self):
        """
        Only students, admin-teachers or class-teachers can retrieve a class.
        """
        self.assert_get_permissions(
            permissions=[
                OR(
                    IsStudent(),
                    OR(IsTeacher(is_admin=True), IsTeacher(in_class=True)),
                )
            ],
            action="retrieve",
        )

    def test_create__self(self):
        """
        Teacher can create a class with themself as the class owner.
        """

        user = self.client.login_school_teacher(
            email="teacher@school1.com",
            password="password",
        )

        self.client.create(
            {
                "name": "ExampleClass",
                "school": user.teacher.school.id,
                "read_classmates_data": False,
                "receive_requests_until": timezone.now() + timedelta(days=1),
            },
        )

    def test_create__other(self):
        """
        Teacher can create a class with another teacher as the class owner.
        """

        user = self.client.login_admin_school_teacher(
            email="admin.teacher@school1.com",
            password="password",
        )

        teacher = (
            Teacher.objects.filter(school=user.teacher.school)
            .exclude(pk=user.teacher.pk)
            .first()
        )
        assert teacher

        self.client.create(
            {
                "name": "ExampleClass",
                "school": user.teacher.school.id,
                "read_classmates_data": False,
                "receive_requests_until": timezone.now() + timedelta(days=1),
                "teacher": teacher.id,
            },
        )

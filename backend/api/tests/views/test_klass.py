"""
© Ocado Group
Created on 05/02/2024 at 16:13:46(+00:00).
"""

from datetime import timedelta

from codeforlife.permissions import AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, Teacher
from codeforlife.user.permissions import InSchool, IsTeacher
from django.utils import timezone

from ...views import ClassViewSet


# pylint: disable-next=missing-class-docstring
class TestClassViewSet(ModelViewSetTestCase[Class]):
    basename = "class"
    model_view_set_class = ClassViewSet
    fixtures = ["school_1"]

    def test_get_permissions__bulk(self):
        """
        No one is allowed to perform bulk actions.
        """

        self.assert_get_permissions(
            permissions=[AllowNone()],
            action="bulk",
        )

    def test_get_permissions__create(self):
        """
        Only a school-teacher can create a class.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="create",
        )

    def test_get_permissions__update(self):
        """
        Only a school-teacher can update a class.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="update",
        )

    def test_get_permissions__destroy(self):
        """
        Only a school-teacher can destroy a class.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="destroy",
        )

    def test_get_permissions__list(self):
        """
        Only a school-teacher can list classes.
        """

        self.assert_get_permissions(
            permissions=[IsTeacher(), InSchool()],
            action="list",
        )

    def test_get_permissions__retrieve(self):
        """
        Any school-user can retrieve a class.
        """

        self.assert_get_permissions(
            permissions=[InSchool()],
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

        user = self.client.login_school_teacher(
            email="admin.teacher@school1.com",
            password="password",
            is_admin=True,
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

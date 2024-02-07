"""
© Ocado Group
Created on 02/02/2024 at 15:31:21(+00:00).
"""

from codeforlife.permissions import NOT, AllowNone
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import School
from codeforlife.user.permissions import InSchool, IsTeacher

from ...views import SchoolViewSet


# pylint: disable-next=missing-class-docstring
class TestSchoolViewSet(ModelViewSetTestCase[School]):
    basename = "school"
    model_view_set_class = SchoolViewSet
    fixtures = ["non_school_teacher", "school_1"]

    def test_get_permissions__bulk(self):
        """No one is allowed to perform bulk actions."""

        self.assert_get_permissions(
            permissions=[AllowNone()],
            action="bulk",
        )

    def test_get_permissions__list(self):
        """No one is allowed to list schools."""

        self.assert_get_permissions(
            permissions=[AllowNone()],
            action="list",
        )

    def test_get_permissions__create(self):
        """Only teachers not in a school can create a school."""

        self.assert_get_permissions(
            permissions=[IsTeacher(), NOT(InSchool())],
            action="create",
        )

    def test_get_permissions__update(self):
        """Only admin-teachers in a school can update a school."""

        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True), InSchool()],
            action="update",
        )

    def test_get_permissions__retrieve(self):
        """Anyone in a school can retrieve a school."""

        self.assert_get_permissions(
            permissions=[InSchool()],
            action="retrieve",
        )

    def test_create(self):
        """Can successfully create a school."""

        self.client.login_non_school_teacher(
            email="teacher@noschool.com",
            password="password",
            in_school=False,
        )

        self.client.create(
            {
                "name": "ExampleSchool",
                "uk_county": "Surrey",
                "country": "GB",
            },
        )

    def test_partial_update(self):
        """Can successfully update a school."""

        user = self.client.login_school_teacher(
            is_admin=True,
            email="admin.teacher@school1.com",
            password="password",
        )

        self.client.partial_update(
            user.teacher.school,
            {
                "name": "NewSchoolName",
                "uk_county": "Surrey",
                "country": "GB",
            },
        )

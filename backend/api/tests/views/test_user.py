"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

import typing as t

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, User

from ...views import UserViewSet


# pylint: disable-next=missing-class-docstring
class TestUserViewSet(ModelViewSetTestCase[User]):
    basename = "user"
    model_view_set_class = UserViewSet

    def _login_school_teacher(self):
        return self.client.login_school_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def test_bulk_create__students(self):
        """
        Teacher can bulk create students.
        """

        user = self._login_school_teacher()

        klass: t.Optional[Class] = user.teacher.class_teacher.first()
        assert klass is not None

        self.client.bulk_create(
            [
                {
                    "first_name": "Peter",
                    "student": {"klass": klass.access_code},
                },
                {
                    "first_name": "Mary",
                    "student": {"klass": klass.access_code},
                },
            ]
        )

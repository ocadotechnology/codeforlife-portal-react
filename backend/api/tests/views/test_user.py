"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

import typing as t

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, User

from ...views import UserViewSet


class TestUserViewSet(ModelViewSetTestCase[User]):
    """
    Base naming convention:
        test_{action}

    action: The view set action.
        https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions
    """

    basename = "user"
    model_view_set_class = UserViewSet

    def _login_teacher(self):
        return self.client.login_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def test_is_unique_email(self):
        """
        Check email is unique.
        """

        user = User.objects.first()
        assert user is not None

        viewname = self.client.reverse("is-unique-email")

        response = self.client.post(viewname, data={"email": user.email})

        self.assertFalse(response.json())

        response = self.client.post(
            viewname,
            data={"email": "unique.email@codeforlife.com"},
        )

        self.assertTrue(response.json())

    def test_bulk_create__students(self):
        """
        Teacher can bulk create students.
        """

        user = self._login_teacher()
        assert user.teacher.school is not None

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

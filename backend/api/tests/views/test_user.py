"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import User

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

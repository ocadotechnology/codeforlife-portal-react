"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import User

from ...serializers import UserSerializer
from ...views import UserViewSet


class TestUserViewSet(ModelViewSetTestCase[UserViewSet, UserSerializer, User]):
    """
    Base naming convention:
        test_{action}

    action: The view set action.
        https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions
    """

    basename = "user"

    def _login_teacher(self):
        return self.client.login_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def test_partial_update__email(self):
        """
        Updating the email field also updates the username field.
        """

        user = self._login_teacher()

        email = "example@codeforelife.com"

        self.client.partial_update(user, {"email": email})

        assert user.username == email

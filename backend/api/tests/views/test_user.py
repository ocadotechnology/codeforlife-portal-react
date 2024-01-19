import typing as t

from codeforlife.tests.api import (
    AnyModel,
    AnyModelSerializer,
    AnyModelViewSet,
    APIClient,
    APITestCase,
    Response,
    reverse,
)
from codeforlife.user.models import User

from ...serializers import UserSerializer


class APIClient2(APIClient):
    def partial_update(
        self,
        data: t.Dict[str, t.Any],
        basename: str,
        model: AnyModel,
        model_serializer_class: t.Type[AnyModelSerializer],
        status_code_assertion: APIClient.StatusCodeAssertion = None,
        model_view_set_class: t.Optional[t.Type[AnyModelViewSet]] = None,
        **kwargs,
    ):
        lookup_field = (
            "pk"
            if model_view_set_class is None
            else model_view_set_class.lookup_field
        )

        response = self.patch(
            reverse(
                f"{basename}-detail",
                kwargs={lookup_field: getattr(model, lookup_field)},
            ),
            data=data,
            status_code_assertion=status_code_assertion,
            **kwargs,
        )

        if self.status_code_is_ok(response.status_code):
            self.assert_data_equals_model(
                data,
                model,
                model_serializer_class,
            )

        return response


class TestUserViewSet(APITestCase):
    client: APIClient2
    client_class = APIClient2

    """
    Base naming convention:
        test_{action}

    action: The view set action.
        https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions
    """

    def _login_teacher(self):
        return self.client.login_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def _partially_update_user(
        self,
        data: t.Dict[str, t.Any],
        user: User,
        status_code_assertion: APIClient.StatusCodeAssertion = None,
    ):
        return self.client.partial_update(
            data,
            "user",
            user,
            UserSerializer,
            status_code_assertion,
        )

    def test_partial_update__email(self):
        """
        User can update their own email.
        """

        user = self._login_teacher()

        self._partially_update_user(
            {"email": "example@codeforelife.com"},
            user,
        )

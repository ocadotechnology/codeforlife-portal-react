"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

import typing as t

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, User
from rest_framework import status

from ...views import UserViewSet


class TestUserViewSet(ModelViewSetTestCase[User]):
    """
    Base naming convention:
        test_{action}
        test_{action}__{method_name}
        test_{action}__{case}
        test_{action}__{method_name}__{case}

    action: The view set action.
        https://www.django-rest-framework.org/api-guide/viewsets/#viewset-actions
    """

    basename = "user"
    model_view_set_class = UserViewSet
    fixtures = ["independent", "non_school_teacher"]

    teacher_email = "teacher@noschool.com"
    indy_email = "indy@man.com"

    def _login_teacher(self):
        return self.client.login_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def _request_reset_password_response(self, email: str):
        viewname = self.client.reverse("request-password-reset")

        return self.client.post(viewname, data={"email": email})

    def test_is_unique_email(self):
        """Check email is unique."""

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
        """Teacher can bulk create students."""

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

    def test_request_password_reset__invalid_email(self):
        """
        Check request password reset doesn't generate reset password URL if
        email is invalid but still returns a 200.
        """
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(
            viewname, data={"email": "nonexistent@email.com"}
        )

        assert response.data is None

    def test_request_password_reset__empty_email(self):
        """Check email field is required."""
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["email"] == ["Field is required."]

    def test_request_password_reset__valid_email(self):
        """
        Check request password reset generates reset password URL for valid
        email.
        """
        response = self._request_reset_password_response(self.teacher_email)

        assert response.data["reset_password_url"] is not None
        assert response.data["pk"] is not None
        assert response.data["token"] is not None

    def test_reset_password__invalid_pk(self):
        """Check reset password raises 400 on GET with invalid pk"""
        response = self._request_reset_password_response(self.teacher_email)

        viewname = self.client.reverse(
            "reset-password",
            kwargs={"pk": "whatever", "token": response.data["token"]},
        )

        invalid_uid_response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert invalid_uid_response.data["non_field_errors"] == [
            "No user found for given ID."
        ]

    def test_reset_password__invalid_token(self):
        """Check reset password raises 400 on GET with invalid token"""
        response = self._request_reset_password_response(self.teacher_email)

        viewname = self.client.reverse(
            "reset-password",
            kwargs={"pk": response.data["pk"], "token": "whatever"},
        )

        invalid_token_response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert invalid_token_response.data["non_field_errors"] == [
            "Token doesn't match given user."
        ]

    def test_reset_password__patch__teacher(self):
        """Check teacher can successfully update password."""
        response = self._request_reset_password_response(self.teacher_email)
        reset_password_url = response.data["reset_password_url"]

        self.client.get(reset_password_url)

        # Test reset-password PATCH for teacher
        self.client.patch(reset_password_url, data={"password": "N3wPassword!"})
        self.client.login(email=self.teacher_email, password="N3wPassword!")
        self.client.logout()

    def test_reset_password__patch__indy(self):
        """Check indy can successfully update password."""
        response = self._request_reset_password_response(self.indy_email)
        reset_password_url = response.data["reset_password_url"]

        self.client.get(reset_password_url)

        # Test reset-password PATCH for indy
        self.client.patch(reset_password_url, data={"password": "N3wPassword"})
        self.client.login(email=self.indy_email, password="N3wPassword")

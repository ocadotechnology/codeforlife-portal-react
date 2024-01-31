"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import User
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

    def test_request_password_reset__valid_email(self):
        """
        Check request password reset generates reset password URL for valid
        email.
        """
        user = User.objects.first()
        assert user is not None

        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})

        assert response.data["reset_password_url"] is not None
        assert response.data["uidb64"] is not None
        assert response.data["token"] is not None

    def test_reset_password__invalid_uidb64(self):
        """Check reset password raises 400 on GET with invalid uidb64"""
        user = User.objects.first()
        assert user is not None

        # Generate a password reset URL
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})

        # Test reset-password GET
        # Check invalid uid raises 400
        viewname = self.client.reverse(
            "reset-password",
            kwargs={"uidb64": "whatever", "token": response.data["token"]},
        )

        invalid_uid_response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert invalid_uid_response.data["non_field_errors"] == [
            "no user found for given uid"
        ]

    def test_reset_password__invalid_token(self):
        """Check reset password raises 400 on GET with invalid token"""
        user = User.objects.first()
        assert user is not None

        # Generate a password reset URL
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})

        # Check invalid token raises 400
        viewname = self.client.reverse(
            "reset-password",
            kwargs={"uidb64": response.data["uidb64"], "token": "whatever"},
        )

        invalid_token_response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert invalid_token_response.data["non_field_errors"] == [
            "token doesn't match given user"
        ]

    def test_reset_password__get(self):
        """Check reset password GET succeeds."""
        user = User.objects.first()
        assert user is not None

        # Generate a password reset URL
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})
        reset_password_url = response.data["reset_password_url"]

        # Check successful GET
        self.client.get(reset_password_url)

    def test_reset_password__patch__teacher(self):
        """Check teacher can successfully update password."""
        user = User.objects.first()
        assert user is not None

        # Generate a password reset URL
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})
        reset_password_url = response.data["reset_password_url"]

        # Check successful GET
        self.client.get(reset_password_url)

        # Test reset-password PATCH for teacher
        self.client.patch(reset_password_url, data={"password": "N3wPassword!"})
        self.client.login(email=user.email, password="N3wPassword!")
        self.client.logout()

    def test_reset_password__patch__indy(self):
        """Check indy can successfully update password."""
        user = User.objects.filter(
            new_teacher__isnull=True, new_student__isnull=True
        ).first()
        assert user is not None

        # Generate a password reset URL
        viewname = self.client.reverse("request-password-reset")

        response = self.client.post(viewname, data={"email": user.email})
        reset_password_url = response.data["reset_password_url"]

        # Check successful GET
        self.client.get(reset_password_url)

        # Test reset-password PATCH for indy
        self.client.patch(reset_password_url, data={"password": "N3wPassword"})
        self.client.login(email=user.email, password="N3wPassword")

"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""

import typing as t

from codeforlife.tests import ModelViewSetTestCase
from codeforlife.user.models import Class, User
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from rest_framework import status

from ...views import UserViewSet

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring
class TestUserViewSet(ModelViewSetTestCase[User]):
    basename = "user"
    model_view_set_class = UserViewSet
    fixtures = ["independent", "non_school_teacher"]

    non_school_teacher_email = "teacher@noschool.com"
    indy_email = "indy@man.com"

    def _login_school_teacher(self):
        return self.client.login_school_teacher(
            email="maxplanck@codeforlife.com",
            password="Password1",
            is_admin=False,
        )

    def _get_pk_and_token_for_user(self, email: str):
        user = User.objects.get(email__iexact=email)
        token = default_token_generator.make_token(user)

        return user.pk, token

    def test_bulk_create__students(self):
        """Teacher can bulk create students."""

        user = self._login_school_teacher()

        klass: t.Optional[Class] = user.teacher.class_teacher.first()
        assert klass is not None

        response = self.client.bulk_create(
            [
                {
                    "first_name": "Peter",
                    "student": {"klass": klass.access_code},
                },
                {
                    "first_name": "Mary",
                    "student": {"klass": klass.access_code},
                },
            ],
            make_assertions=False,
        )

        response.json()  # TODO: make custom assertions and check for password

    def test_request_password_reset__invalid_email(self):
        """
        Request password reset doesn't generate reset password URL if email
        is invalid but still returns a 200.
        """
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname,
            data={"email": "nonexistent@email.com"},
            status_code_assertion=status.HTTP_200_OK,
        )

        assert response.data is None

    def test_request_password_reset__empty_email(self):
        """Email field is required."""
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["email"] == ["Field is required."]

    def test_request_password_reset__valid_email(self):
        """
        Request password reset generates reset password URL for valid email.
        """
        viewname = self.reverse_action("request-password-reset")

        response = self.client.post(
            viewname, data={"email": self.non_school_teacher_email}
        )

        assert response.data["reset_password_url"] is not None
        assert response.data["pk"] is not None
        assert response.data["token"] is not None

    def test_reset_password__invalid_pk(self):
        """Reset password raises 400 on GET with invalid pk"""
        _, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": "whatever", "token": token},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "No user found for given ID."
        ]

    def test_reset_password__invalid_token(self):
        """Reset password raises 400 on GET with invalid token"""
        pk, _ = self._get_pk_and_token_for_user(self.non_school_teacher_email)

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": "whatever"},
        )

        response = self.client.get(
            viewname, status_code_assertion=status.HTTP_400_BAD_REQUEST
        )

        assert response.data["non_field_errors"] == [
            "Token doesn't match given user."
        ]

    def test_reset_password__get(self):
        """Reset password GET succeeds."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": token},
        )

        self.client.get(viewname)

    def test_reset_password__patch__teacher(self):
        """Teacher can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": token},
        )

        self.client.patch(viewname, data={"password": "N3wPassword!"})
        user = self.client.login(
            email=self.non_school_teacher_email, password="N3wPassword!"
        )
        assert user is not None

    def test_reset_password__patch__indy(self):
        """Indy can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(self.indy_email)

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": token},
        )

        self.client.patch(viewname, data={"password": "N3wPassword"})
        user = self.client.login(email=self.indy_email, password="N3wPassword")
        assert user is not None

"""
© Ocado Group
Created on 20/01/2024 at 10:58:52(+00:00).
"""
import typing as t

from codeforlife.permissions import OR
from codeforlife.tests import ModelViewSetTestCase
from codeforlife.types import JsonDict
from codeforlife.user.models import (
    AdminSchoolTeacherUser,
    Class,
    IndependentUser,
    SchoolTeacherUser,
    StudentUser,
    User,
)
from codeforlife.user.permissions import IsIndependent, IsTeacher
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
    fixtures = ["independent", "non_school_teacher", "school_1", "school_2"]

    non_school_teacher_email = "teacher@noschool.com"
    school_teacher_email = "teacher@school1.com"
    indy_email = "indy@man.com"
    indy_with_join_request_email = "indy@requester.com"

    def setUp(self):
        self.non_admin_school_teacher_user = SchoolTeacherUser.objects.get(
            email=self.school_teacher_email
        )
        self.admin_school_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school1.com"
        )
        self.admin_school2_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school2.com"
        )
        self.indy_with_join_request = IndependentUser.objects.get(
            email=self.indy_with_join_request_email
        )
        self.class_2 = Class.objects.get(name="Class 2 @ School 1")

    def _get_pk_and_token_for_user(self, email: str):
        user = User.objects.get(email__iexact=email)
        token = default_token_generator.make_token(user)

        return user.pk, token

    # test: get permissions

    def test_get_permissions__bulk(self):
        """Only admin-teachers or class-teachers can perform bulk actions."""
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="bulk",
        )

    def test_get_permissions__students__reset_password(self):
        """
        Only admin-teachers or class-teachers can reset students' passwords.
        """
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="students__reset_password",
        )

    def test_get_permissions__partial_update__teacher(self):
        """Only admin-teachers can update a teacher."""
        self.assert_get_permissions(
            permissions=[IsTeacher(is_admin=True)],
            action="partial_update",
            request=self.client.request_factory.patch(data={"teacher": {}}),
        )

    def test_get_permissions__partial_update__student(self):
        """Only admin-teachers or class-teachers can update a student."""
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="partial_update",
            request=self.client.request_factory.patch(data={"student": {}}),
        )

    def test_get_permissions__partial_update__requesting_to_join_class(
        self,
    ):
        """
        Only school-teachers and independents can update an independent's class
        join request.
        """
        self.assert_get_permissions(
            permissions=[
                OR(
                    OR(IsTeacher(is_admin=True), IsTeacher(in_class=True)),
                    IsIndependent(),
                )
            ],
            action="partial_update",
            request=self.client.request_factory.patch(
                data={"requesting_to_join_class": ""}
            ),
        )

    def test_get_permissions__handle_join_class_request(self):
        """
        Only school-teachers can handle an independent's class join request.
        """
        self.assert_get_permissions(
            permissions=[
                OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))
            ],
            action="handle_join_class_request",
            request=self.client.request_factory.patch(data={"accept": False}),
        )

    # test: get queryset

    def _test_get_queryset(self, action: str, request_method: str):
        student_users = list(
            User.objects.filter(
                new_student__class_field__teacher__school=(
                    self.admin_school_teacher_user.teacher.school
                )
            )
        )
        assert student_users

        request = self.client.request_factory.generic(
            request_method, user=self.admin_school_teacher_user
        )

        self.assert_get_queryset(student_users, action=action, request=request)

    def test_get_queryset__bulk__patch(self):
        """Bulk partial-update can only target student-users."""
        self._test_get_queryset(action="bulk", request_method="patch")

    def test_get_queryset__bulk__delete(self):
        """Bulk destroy can only target student-users."""
        self._test_get_queryset(action="bulk", request_method="delete")

    def test_get_queryset__students__reset_password(self):
        """Resetting student passwords can only target student-users."""
        self._test_get_queryset(
            action="students__reset_password", request_method="patch"
        )

    # test: bulk actions

    def test_bulk_create__students(self):
        """Teacher can bulk create students."""
        user = self.client.login_non_admin_school_teacher(
            email=self.school_teacher_email,
            password="password",
        )

        klass: t.Optional[Class] = user.teacher.class_teacher.first()
        assert klass is not None

        response = self.client.bulk_create(
            [
                {
                    "first_name": "Peter",
                    "student": {"klass": klass.access_code},
                },
                {"first_name": "Mary", "student": {"klass": klass.access_code}},
            ],
            make_assertions=False,
        )

        response.json()  # TODO: make custom assertions and check for password

    def test_bulk_destroy(self):
        """School-teacher can bulk anonymize students."""
        self.client.login_as(self.admin_school_teacher_user)

        student_user_queryset = User.objects.filter(
            new_student__class_field__teacher__school=(
                self.admin_school_teacher_user.teacher.school
            )
        )
        student_user_ids = list(
            student_user_queryset.values_list("id", flat=True)
        )
        assert student_user_ids

        self.client.bulk_destroy(student_user_ids, make_assertions=False)

        assert (
            len(student_user_ids)
            == student_user_queryset.filter(
                first_name="", is_active=False
            ).count()
        )

    # test: class join request actions

    def test_handle_join_class_request__invalid_school(self):
        """Teacher cannot handle a join request outside their school"""
        self.client.login_as(self.admin_school2_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={"accept": False},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["non_field_errors"] == [
            "This class join request is not in your school."
        ]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__invalid_class(self):
        """Non-admin teacher cannot reject a join request outside their class"""
        self.client.login_as(self.non_admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={"accept": False},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["non_field_errors"] == [
            "This class join request is not for one for your classes."
        ]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__invalid_accept(self):
        """Teacher cannot handle join class request with wrong accept type"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={"accept": "lol"},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["non_field_errors"] == [
            "Invalid type for accept - must be True or False."
        ]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__missing_accept(self):
        """Teacher cannot handle join class request with missing accept"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["non_field_errors"] == [
            "Accept field is required."
        ]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__reject(self):
        """Teacher can successfully reject a join class request."""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        self.client.patch(
            viewname,
            data={"accept": False},
            status_code_assertion=status.HTTP_200_OK,
            format="json",
        )

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            is None
        )

    def test_handle_join_class_request__accept__invalid_first_name(self):
        """Teacher cannot accept a join class request with invalid name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={"accept": True, "first_name": 1},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["first_name"] == ["First name must be a string."]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__accept__missing_first_name(self):
        """Teacher cannot accept a join class request with missing name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={"accept": True},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["first_name"] == ["This field is required."]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__accept__duplicate_first_name(self):
        """Teacher cannot accept a join class request with duplicate name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        response = self.client.patch(
            viewname,
            data={
                "accept": True,
                "first_name": self.class_2.students.first().new_user.first_name,
            },
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["first_name"] == [
            "This name already exists in the class. "
            "Please choose a different name."
        ]

        self.indy_with_join_request.refresh_from_db()
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            == self.class_2
        )

    def test_handle_join_class_request__accept(self):
        """Teacher can successfully accept a join class request."""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request",
            kwargs={"pk": self.indy_with_join_request.pk},
        )

        self.client.patch(
            viewname,
            data={
                "accept": True,
                "first_name": self.indy_with_join_request.first_name,
            },
            status_code_assertion=status.HTTP_200_OK,
            format="json",
        )

        self.indy_with_join_request.refresh_from_db()

        assert (
            self.indy_with_join_request.new_student.class_field == self.class_2
        )
        assert (
            self.indy_with_join_request.new_student.pending_class_request
            is None
        )
        assert self.indy_with_join_request.last_name == ""
        assert self.indy_with_join_request.email == ""
        assert (
            self.indy_with_join_request.username
            != self.indy_with_join_request_email
        )

    # test: reset password actions

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
            "reset-password", kwargs={"pk": "whatever", "token": token}
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
            "reset-password", kwargs={"pk": pk, "token": "whatever"}
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
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.get(viewname)

    def test_reset_password__patch__teacher(self):
        """Teacher can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.patch(viewname, data={"password": "N3wPassword!"})
        self.client.login(
            email=self.non_school_teacher_email, password="N3wPassword!"
        )

    def test_reset_password__patch__indy(self):
        """Indy can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(self.indy_email)

        viewname = self.reverse_action(
            "reset-password",
            kwargs={"pk": pk, "token": token},
        )

        self.client.patch(viewname, data={"password": "N3wPassword"})
        self.client.login(email=self.indy_email, password="N3wPassword")

    # test: students actions

    def test_students__reset_password(self):
        """Teacher can bulk reset students' password."""
        self.client.login_as(self.admin_school_teacher_user)

        student_users = list(
            StudentUser.objects.filter(
                new_student__class_field__teacher__school=(
                    self.admin_school_teacher_user.teacher.school
                )
            )
        )
        assert student_users

        response = self.client.patch(
            self.reverse_action("students--reset-password"),
            [student_user.id for student_user in student_users],
            content_type="application/json",
        )

        fields: JsonDict = response.json()
        for student_user in student_users:
            student_user_fields = t.cast(JsonDict, fields[str(student_user.id)])

            password = t.cast(str, student_user_fields["password"])
            assert isinstance(password, str)
            assert not student_user.check_password(password)

            student_login_id = t.cast(
                str,
                t.cast(
                    JsonDict,
                    student_user_fields["student"],
                )["login_id"],
            )
            assert isinstance(student_login_id, str)
            assert student_user.student.login_id != student_login_id

            student_user.refresh_from_db()
            assert student_user.check_password(password)
            self.client.login_as(student_user, password)
            assert student_user.student.login_id == student_login_id

    # test: generic actions

    def test_partial_update__teacher(self):
        """Admin-school-teacher can update another teacher's profile."""
        admin_school_teacher_user = self.client.login_admin_school_teacher(
            email="admin.teacher@school1.com", password="password"
        )

        other_school_teacher_user = (
            SchoolTeacherUser.objects.filter(
                new_teacher__school=admin_school_teacher_user.teacher.school
            )
            .exclude(pk=admin_school_teacher_user.pk)
            .first()
        )
        assert other_school_teacher_user

        self.client.partial_update(
            other_school_teacher_user,
            {
                "last_name": other_school_teacher_user.first_name,
                "teacher": {
                    "is_admin": not other_school_teacher_user.teacher.is_admin
                },
            },
        )

    def test_partial_update__indy__send_join_request(self):
        """Independent user can request to join a class."""
        indy_user = self.client.login_indy(
            email=self.indy_email, password="password"
        )

        self.client.partial_update(
            indy_user,
            {"requesting_to_join_class": self.class_2.access_code},
        )

    def test_partial_update__indy__revoke_join_request(self):
        """Independent user can revoke their request to join a class."""
        indy_user_with_join_request = self.client.login_indy(
            email=self.indy_with_join_request_email, password="password"
        )

        self.client.partial_update(
            indy_user_with_join_request,
            {"requesting_to_join_class": ""},
        )

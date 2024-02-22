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
    NonAdminSchoolTeacherUser,
    NonSchoolTeacherUser,
    SchoolTeacherUser,
    Student,
    StudentUser,
    TypedUser,
    User,
)
from codeforlife.user.permissions import IsIndependent, IsTeacher
from django.contrib.auth.tokens import (
    PasswordResetTokenGenerator,
    default_token_generator,
)
from django.db.models.query import QuerySet
from rest_framework import status

from ...views import UserViewSet

# NOTE: type hint to help Intellisense.
default_token_generator: PasswordResetTokenGenerator = default_token_generator


# pylint: disable-next=missing-class-docstring,too-many-public-methods
class TestUserViewSet(ModelViewSetTestCase[User]):
    basename = "user"
    model_view_set_class = UserViewSet
    fixtures = [
        "independent",
        "independent_school_1_class_1_join_request",
        "non_school_teacher",
        "school_1",
        "school_2",
    ]

    def setUp(self):
        self.non_school_teacher_user = NonSchoolTeacherUser.objects.get(
            email="teacher@noschool.com"
        )
        self.non_admin_school_teacher_user = (
            NonAdminSchoolTeacherUser.objects.get(email="teacher@school1.com")
        )
        self.admin_school_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school1.com"
        )
        self.admin_school2_teacher_user = AdminSchoolTeacherUser.objects.get(
            email="admin.teacher@school2.com"
        )
        self.indy_user = IndependentUser.objects.get(email="indy@man.com")
        self.class_2 = Class.objects.get(name="Class 2 @ School 1")

    def _get_pk_and_token_for_user(self, email: str):
        user = User.objects.get(email__iexact=email)
        token = default_token_generator.make_token(user)

        return user.pk, token

    # test: get permissions

    def test_get_permissions__bulk(self):
        """Only admin-teachers or class-teachers can perform bulk actions."""
        self.assert_get_permissions(
            [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))],
            action="bulk",
        )

    def test_get_permissions__students__reset_password(self):
        """
        Only admin-teachers or class-teachers can reset students' passwords.
        """
        self.assert_get_permissions(
            [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))],
            action="students__reset_password",
        )

    def test_get_permissions__partial_update__teacher(self):
        """Only admin-teachers can update a teacher."""
        self.assert_get_permissions(
            [IsTeacher(is_admin=True)],
            action="partial_update",
            request=self.client.request_factory.patch(data={"teacher": {}}),
        )

    def test_get_permissions__partial_update__student(self):
        """Only admin-teachers or class-teachers can update a student."""
        self.assert_get_permissions(
            [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))],
            action="partial_update",
            request=self.client.request_factory.patch(data={"student": {}}),
        )

    def test_get_permissions__partial_update__requesting_to_join_class(
        self,
    ):
        """Only independents can update their class join request."""
        self.assert_get_permissions(
            [IsIndependent()],
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
            [OR(IsTeacher(is_admin=True), IsTeacher(in_class=True))],
            action="handle_join_class_request",
            request=self.client.request_factory.patch(data={"accept": False}),
        )

    def test_get_permissions__destroy(self):
        """Only independents or teachers can destroy a user."""
        self.assert_get_permissions(
            [OR(IsTeacher(), IsIndependent())],
            action="destroy",
        )

    # test: get queryset

    def _test_get_queryset__student_users(
        self, action: str, request_method: str
    ):
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
        self._test_get_queryset__student_users(
            action="bulk", request_method="patch"
        )

    def test_get_queryset__bulk__delete(self):
        """Bulk destroy can only target student-users."""
        self._test_get_queryset__student_users(
            action="bulk", request_method="delete"
        )

    def test_get_queryset__students__reset_password(self):
        """Resetting student passwords can only target student-users."""
        self._test_get_queryset__student_users(
            action="students__reset_password", request_method="patch"
        )

    def test_get_queryset__destroy(self):
        """Destroying a user can only target the user making the request."""
        return self.assert_get_queryset(
            [self.admin_school_teacher_user],
            action="destroy",
            request=self.client.request_factory.delete(
                user=self.admin_school_teacher_user
            ),
        )

    # test: bulk actions

    def test_bulk_create__students(self):
        """Teacher can bulk create students."""
        self.client.login_as(self.non_admin_school_teacher_user)

        klass: t.Optional[
            Class
        ] = self.non_admin_school_teacher_user.teacher.class_teacher.first()
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
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
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

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__invalid_class(self):
        """Non-admin teacher cannot reject a join request outside their class"""
        self.client.login_as(self.non_admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
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

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__invalid_accept(self):
        """Teacher cannot handle join class request with wrong accept type"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
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

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__missing_accept(self):
        """Teacher cannot handle join class request with missing accept"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
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

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__reject(self):
        """Teacher can successfully reject a join class request."""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
        )

        self.client.patch(
            viewname,
            data={"accept": False},
            status_code_assertion=status.HTTP_200_OK,
            format="json",
        )

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request is None

    def test_handle_join_class_request__accept__invalid_first_name(self):
        """Teacher cannot accept a join class request with invalid name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
        )

        response = self.client.patch(
            viewname,
            data={"accept": True, "first_name": 1},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["first_name"] == ["First name must be a string."]

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__accept__missing_first_name(self):
        """Teacher cannot accept a join class request with missing name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
        )

        response = self.client.patch(
            viewname,
            data={"accept": True},
            status_code_assertion=status.HTTP_400_BAD_REQUEST,
            format="json",
        )

        assert response.data["first_name"] == ["This field is required."]

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__accept__duplicate_first_name(self):
        """Teacher cannot accept a join class request with duplicate name"""
        self.client.login_as(self.admin_school_teacher_user)

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
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

        self.indy_user.refresh_from_db()
        assert self.indy_user.new_student.pending_class_request == self.class_2

    def test_handle_join_class_request__accept(self):
        """Teacher can successfully accept a join class request."""
        self.client.login_as(self.admin_school_teacher_user)

        indy_email = self.indy_user.email

        viewname = self.reverse_action(
            "handle-join-class-request", kwargs={"pk": self.indy_user.pk}
        )

        self.client.patch(
            viewname,
            data={
                "accept": True,
                "first_name": self.indy_user.first_name,
            },
            status_code_assertion=status.HTTP_200_OK,
            format="json",
        )

        self.indy_user.refresh_from_db()

        assert self.indy_user.new_student.class_field == self.class_2
        assert self.indy_user.new_student.pending_class_request is None
        assert self.indy_user.last_name == ""
        assert self.indy_user.email == ""
        assert self.indy_user.username != indy_email

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
            viewname, data={"email": self.non_school_teacher_user.email}
        )

        assert response.data["reset_password_url"] is not None
        assert response.data["pk"] is not None
        assert response.data["token"] is not None

    def test_reset_password__invalid_pk(self):
        """Reset password raises 400 on GET with invalid pk"""
        _, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_user.email
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
        pk, _ = self._get_pk_and_token_for_user(
            self.non_school_teacher_user.email
        )

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
            self.non_school_teacher_user.email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.get(viewname)

    def test_reset_password__patch__teacher(self):
        """Teacher can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(
            self.non_school_teacher_user.email
        )

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.patch(viewname, data={"password": "N3wPassword!"})
        self.client.login_as(
            self.non_school_teacher_user, password="N3wPassword!"
        )

    def test_reset_password__patch__indy(self):
        """Indy can successfully update password."""
        pk, token = self._get_pk_and_token_for_user(self.indy_user.email)

        viewname = self.reverse_action(
            "reset-password", kwargs={"pk": pk, "token": token}
        )

        self.client.patch(viewname, data={"password": "N3wPassword"})
        self.client.login_as(self.indy_user, password="N3wPassword")

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
        self.client.login_as(self.admin_school_teacher_user)

        other_school_teacher_user = (
            SchoolTeacherUser.objects.filter(
                new_teacher__school=self.admin_school_teacher_user.teacher.school
            )
            .exclude(pk=self.admin_school_teacher_user.pk)
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
        self.client.login_as(self.indy_user)

        self.client.partial_update(
            self.indy_user,
            {"requesting_to_join_class": self.class_2.access_code},
        )

    def test_partial_update__indy__revoke_join_request(self):
        """Independent user can revoke their request to join a class."""
        self.client.login_as(self.indy_user)

        self.client.partial_update(
            self.indy_user, {"requesting_to_join_class": ""}
        )

    def assert_user_is_anonymized(self, user: User):
        """Assert user has been anonymized.

        Args:
            user: The user to assert.
        """
        assert user.first_name == ""
        assert user.last_name == ""
        assert user.email == ""
        assert not user.is_active

    def assert_classes_are_anonymized(
        self,
        school_teacher_user: SchoolTeacherUser,
        class_names: t.Iterable[str],
    ):
        """Assert the classes and their students have been anonymized.

        Args:
            school_teacher_user: The user the classes belong to.
            class_names: The original class names.
        """
        # TODO: remove when using new data strategy
        queryset = QuerySet(
            model=Class.objects.model,
            using=Class.objects._db,
            hints=Class.objects._hints,
        ).filter(teacher=school_teacher_user.teacher)

        for klass, name in zip(queryset, class_names):
            assert klass.name != name
            assert klass.access_code == ""
            assert not klass.is_active

            student: Student  # TODO: delete in new data schema
            for student in klass.students.all():
                self.assert_user_is_anonymized(student.new_user)

    def _test_destroy(
        self,
        user: TypedUser,
        status_code_assertion: int = status.HTTP_204_NO_CONTENT,
    ):
        self.client.login_as(user)
        self.client.destroy(
            user,
            status_code_assertion=status_code_assertion,
            make_assertions=False,
        )

    def test_destroy__class_teacher(self):
        """Class-teacher-users can anonymize themselves and their classes."""
        user = self.non_admin_school_teacher_user
        assert user.teacher.class_teacher.exists()
        class_names = list(
            user.teacher.class_teacher.values_list("name", flat=True)
        )

        self._test_destroy(user)
        user.refresh_from_db()
        self.assert_user_is_anonymized(user)
        self.assert_classes_are_anonymized(user, class_names)

    def test_destroy__school_teacher__last_teacher(self):
        """
        School-teacher-users can anonymize themselves and their school if they
        are the last teacher.
        """
        user = self.admin_school_teacher_user
        assert user.teacher.class_teacher.exists()
        class_names = list(
            user.teacher.class_teacher.values_list("name", flat=True)
        )
        school_name = user.teacher.school.name

        SchoolTeacherUser.objects.filter(
            new_teacher__school=user.teacher.school
        ).exclude(pk=user.pk).delete()

        self._test_destroy(user)
        user.refresh_from_db()
        self.assert_user_is_anonymized(user)
        self.assert_classes_are_anonymized(user, class_names)
        assert user.teacher.school.name != school_name
        assert not user.teacher.school.is_active

    def test_destroy__school_teacher__last_admin_teacher(self):
        """
        School-teacher-users cannot anonymize themselves if they are the last
        admin teachers.
        """
        self._test_destroy(
            self.admin_school_teacher_user,
            status_code_assertion=status.HTTP_409_CONFLICT,
        )

    def test_destroy__independent(self):
        """Independent-users can anonymize themselves."""
        user = self.indy_user
        self._test_destroy(user)
        user.refresh_from_db()
        self.assert_user_is_anonymized(user)

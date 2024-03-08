"""
© Ocado Group
Created on 29/01/2024 at 10:14:59(+00:00).
"""

import typing as t
from itertools import groupby

from codeforlife.serializers import ModelListSerializer
from codeforlife.types import DataDict
from codeforlife.user.models import Class, Student, StudentUser, User
from codeforlife.user.serializers import BaseUserSerializer
from codeforlife.user.serializers import StudentSerializer as _StudentSerializer
from rest_framework import serializers

# pylint: disable=missing-class-docstring
# pylint: disable=too-many-ancestors
# pylint: disable=missing-function-docstring


class BaseStudentPasswordSerializer(_StudentSerializer):
    """
    To be inherited by serializers that need to return the student's
    auto-generated password.
    """

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        # Return student's auto-generated password.
        # pylint: disable-next=protected-access
        password = instance.new_user._password
        if password is not None:
            representation["user"]["password"] = password
            representation["login_id"] = instance.login_id

        return representation


class CreateStudentListSerializer(ModelListSerializer[Student]):
    def create(self, validated_data):
        classes = {
            klass.access_code: klass
            for klass in Class.objects.filter(
                access_code__in={
                    student_fields["class_field"]["access_code"]
                    for student_fields in validated_data
                }
            )
        }

        # TODO: replace this logic with bulk creates for each object when we
        #   switch to PostgreSQL.
        return [
            StudentUser.objects.create_user(
                first_name=student_fields["new_user"]["first_name"],
                klass=classes[student_fields["class_field"]["access_code"]],
            ).student
            for student_fields in validated_data
        ]

    def validate(self, attrs):
        super().validate(attrs)

        def get_class_id(student_fields: DataDict):
            class_field: DataDict = student_fields.get("class_field", {})
            return t.cast(t.Optional[str], class_field.get("access_code"))

        def get_first_name(student_fields: DataDict):
            new_user: DataDict = student_fields.get("new_user", {})
            return t.cast(t.Optional[str], new_user.get("first_name"))

        # Copy list to preserve its original order.
        attrs_copy = attrs.copy()
        attrs_copy.sort(key=get_class_id)
        for access_code, group in groupby(attrs_copy, key=get_class_id):
            if access_code is None:
                continue

            # Validate first name is not specified more than once in data.
            data = list(group)
            data.sort(key=get_first_name)
            for first_name, group in groupby(data, key=get_first_name):
                if first_name is not None and len(list(group)) > 1:
                    raise serializers.ValidationError(
                        f'First name "{first_name}" is specified more than once'
                        f" in data for class {access_code}.",
                        code="first_name__data__not_unique_per_class",
                    )

            # Validate first names are not already taken in class.
            first_names = [
                first_name
                for first_name in map(get_first_name, data)
                if first_name is not None
            ]

            if (
                first_names
                and StudentUser.objects.filter(
                    first_name__in=first_names,
                    new_student__class_field__access_code=access_code,
                ).exists()
            ):
                raise serializers.ValidationError(
                    "One or more first names is already taken in class"
                    f" {access_code}.",
                    code="first_name__data__not_unique_per_class_in_db",
                )

        return attrs


class CreateStudentSerializer(BaseStudentPasswordSerializer):
    class UserSerializer(BaseUserSerializer[StudentUser]):
        class Meta(BaseUserSerializer.Meta):
            extra_kwargs = {
                **BaseUserSerializer.Meta.extra_kwargs,
                "first_name": {"min_length": 1},
            }

    user = UserSerializer(source="new_user")
    klass = serializers.CharField(source="class_field.access_code")

    class Meta(BaseStudentPasswordSerializer.Meta):
        fields = [*BaseStudentPasswordSerializer.Meta.fields, "user"]
        list_serializer_class = CreateStudentListSerializer

    def validate_klass(self, value: str):
        # Only teachers can manage students.
        teacher = self.request.school_teacher_user.teacher

        try:
            klass = Class.objects.get(access_code=value)
        except Class.DoesNotExist as ex:
            raise serializers.ValidationError(
                "Class does not exist.",
                code="does_not_exist",
            ) from ex

        if klass.teacher.school_id != teacher.school_id:
            raise serializers.ValidationError(
                "Class must belong to the same school as requesting teacher.",
                code="teacher_not_in_same_school",
            )
        if not teacher.is_admin and klass.teacher != teacher:
            raise serializers.ValidationError(
                "The requesting teacher must be an admin or own the class.",
                code="teacher_not_admin_or_class_owner",
            )

        return value


class ReleaseStudentListSerializer(ModelListSerializer[Student]):
    def update(self, instance, validated_data):
        for student, data in zip(instance, validated_data):
            student.class_field = None
            student.save(update_fields=["class_field"])

            student.new_user.email = data["new_user"]["email"]
            student.new_user.save(update_fields=["email"])

        return instance


class ReleaseStudentSerializer(_StudentSerializer):
    """Convert a student to an independent learner."""

    class UserSerializer(BaseUserSerializer[StudentUser]):
        class Meta(BaseUserSerializer.Meta):
            extra_kwargs = {
                **BaseUserSerializer.Meta.extra_kwargs,
                "first_name": {"min_length": 1, "required": False},
                "email": {"read_only": False},
            }

        # TODO: make email unique in new models and remove this validation.
        def validate_email(self, value: str):
            if User.objects.filter(email__iexact=value).exists():
                raise serializers.ValidationError(
                    "Already exists.", code="already_exists"
                )

            return value

    user = UserSerializer(source="new_user")

    class Meta(_StudentSerializer.Meta):
        fields = [*_StudentSerializer.Meta.fields, "user"]
        list_serializer_class = ReleaseStudentListSerializer


class TransferStudentListSerializer(CreateStudentListSerializer):
    def update(self, instance, validated_data):
        for student, data in zip(instance, validated_data):
            student.class_field = Class.objects.get(
                access_code=data["class_field"]["access_code"]
            )
            student.save(update_fields=["class_field"])

        return instance

    def validate(self, attrs: t.List[DataDict]):
        super().validate(attrs)

        first_names_and_class_ids = [
            (
                student.new_user.first_name,
                t.cast(str, data["class_field"]["access_code"]),
            )
            for student, data in zip(self.non_none_instance, attrs)
            if "first_name" not in data.get("user", {})
        ]

        def get_class_id(first_name_and_class_id: t.Tuple[str, str]):
            return first_name_and_class_id[1]

        first_names_and_class_ids.sort(key=get_class_id)
        for access_code, group in groupby(
            first_names_and_class_ids, key=get_class_id
        ):
            if StudentUser.objects.filter(
                first_name__in=[
                    first_name_and_class_id[0]
                    for first_name_and_class_id in group
                ],
                new_student__class_field__access_code=access_code,
            ).exists():
                raise serializers.ValidationError(
                    "One or more first names is already taken in class"
                    f" {access_code}.",
                    code="first_name__model__not_unique_per_class_in_db",
                )

        return attrs


class TransferStudentSerializer(CreateStudentSerializer):
    """Transfer a student to another class."""

    class UserSerializer(CreateStudentSerializer.UserSerializer):
        class Meta(CreateStudentSerializer.UserSerializer.Meta):
            extra_kwargs = {
                **CreateStudentSerializer.UserSerializer.Meta.extra_kwargs,
                "first_name": {"min_length": 1, "required": False},
            }

    user = UserSerializer(source="new_user", required=False)

    class Meta(CreateStudentSerializer.Meta):
        list_serializer_class = TransferStudentListSerializer


class ResetStudentListPasswordSerializer(ModelListSerializer[Student]):
    def update(self, instance, validated_data):
        for student, data in zip(instance, validated_data):
            # TODO: use proxy in new model and replace with student.user
            student_user = StudentUser(
                pk=student.new_user.pk,
                new_student=student,  # type: ignore[misc]
            )
            student_user.set_password()

            student.save(update_fields=["login_id"])

            # Save deletes the raw password.
            # Need to preserve it and return it to the teacher.
            # pylint: disable=protected-access
            password = student.new_user._password
            student.new_user.save(update_fields=["password"])
            student.new_user._password = password
            # pylint: enable=protected-access

        return instance


class ResetStudentPasswordSerializer(BaseStudentPasswordSerializer):
    class UserSerializer(BaseUserSerializer[StudentUser]):
        class Meta(BaseUserSerializer.Meta):
            fields = [*BaseUserSerializer.Meta.fields, "password"]
            extra_kwargs = {
                **BaseUserSerializer.Meta.extra_kwargs,
                "password": {"write_only": True, "required": False},
            }

    user = UserSerializer(source="new_user", required=False)

    class Meta(BaseStudentPasswordSerializer.Meta):
        fields = [*BaseStudentPasswordSerializer.Meta.fields, "user"]
        list_serializer_class = ResetStudentListPasswordSerializer

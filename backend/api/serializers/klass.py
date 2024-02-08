"""
© Ocado Group
Created on 24/01/2024 at 12:14:21(+00:00).
"""

import string

from codeforlife.user.models import Class, Teacher
from codeforlife.user.serializers import ClassSerializer as _ClassSerializer
from django.utils.crypto import get_random_string
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class ClassSerializer(_ClassSerializer):
    teacher = serializers.IntegerField(
        source="teacher.id",
        required=False,
    )

    read_classmates_data = serializers.BooleanField(
        source="classmates_data_viewable",
    )

    receive_requests_until = serializers.DateTimeField(
        source="accept_requests_until",
        required=False,
    )

    class Meta(_ClassSerializer.Meta):
        extra_kwargs = {
            **_ClassSerializer.Meta.extra_kwargs,
            "name": {"read_only": False},
        }

    # pylint: disable-next=missing-function-docstring
    def validate_teacher(self, value: int):
        queryset = Teacher.objects.filter(id=value)
        if not queryset.exists():
            raise serializers.ValidationError(
                "This teacher does not exist.",
                code="does_not_exist",
            )

        user = self.request_school_teacher_user
        if not queryset.filter(school=user.teacher.school_id).exists():
            raise serializers.ValidationError(
                "This teacher is not in your school.",
                code="not_in_school",
            )
        if value != user.teacher.id and not user.teacher.is_admin:
            raise serializers.ValidationError(
                "Cannot assign another teacher if you're not admin.",
                code="not_admin",
            )

        return value

    # TODO: set unique_together=("name", "school") for in new Class model.
    # pylint: disable-next=missing-function-docstring
    def validate_name(self, value: str):
        if Class.objects.filter(
            teacher__school=self.request_school_teacher_user.teacher.school,
            name=value,
        ).exists():
            raise serializers.ValidationError(
                "Name already taken.",
                code="name_not_unique",
            )

        return value

    def create(self, validated_data):
        # TODO: move generation logic to new Class model.
        access_code = None
        while (
            access_code is None
            or Class.objects.filter(access_code=access_code).exists()
        ):
            access_code = get_random_string(
                length=5,
                allowed_chars=string.ascii_uppercase,
            )

        # TODO: set school to teacher's school on new Class model.
        return super().create(
            {
                "access_code": access_code,
                "name": validated_data["name"],
                "teacher_id": (
                    validated_data["teacher"]["id"]
                    if "teacher" in validated_data
                    else self.request_school_teacher_user.teacher.id
                ),
                "classmates_data_viewable": validated_data[
                    "classmates_data_viewable"
                ],
                "accept_requests_until": validated_data.get(
                    "accept_requests_until"
                ),
            }
        )

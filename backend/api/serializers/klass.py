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
            "teacher": {"required": False},
        }

    # pylint: disable-next=missing-function-docstring
    def validate_teacher(self, value: Teacher):
        user = self.request.school_teacher_user
        if value.school_id != user.teacher.school_id:
            raise serializers.ValidationError(
                "This teacher is not in your school.",
                code="not_in_school",
            )
        if value != user.teacher and not user.teacher.is_admin:
            raise serializers.ValidationError(
                "Cannot assign another teacher if you're not an admin.",
                code="not_admin",
            )

        return value

    # TODO: set unique_together=("name", "school") for in new Class model.
    # pylint: disable-next=missing-function-docstring
    def validate_name(self, value: str):
        if Class.objects.filter(
            teacher__school=self.request.school_teacher_user.teacher.school,
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
                "teacher": (
                    validated_data["teacher"]
                    if "teacher" in validated_data
                    else self.request.school_teacher_user.teacher
                ),
                "classmates_data_viewable": validated_data[
                    "classmates_data_viewable"
                ],
                "accept_requests_until": validated_data.get(
                    "accept_requests_until"
                ),
            }
        )

"""
© Ocado Group
Created on 24/01/2024 at 12:14:21(+00:00).
"""

import string

from codeforlife.user.models import Class
from codeforlife.user.serializers import ClassSerializer as _ClassSerializer
from django.utils.crypto import get_random_string
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class ClassSerializer(_ClassSerializer):
    teacher = serializers.IntegerField(
        source="teacher.id",
    )

    school = serializers.IntegerField(
        source="teacher.school.id",
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
                allowed_chars=string.ascii_uppercase + string.digits,
            )

        return super().create(
            {
                "access_code": access_code,
                "name": validated_data["name"],
                "teacher_id": validated_data["teacher"]["id"],
                "classmates_data_viewable": validated_data[
                    "classmates_data_viewable"
                ],
                "accept_requests_until": validated_data.get(
                    "accept_requests_until"
                ),
            }
        )

"""
© Ocado Group
Created on 29/01/2024 at 10:14:59(+00:00).
"""

import typing as t

from codeforlife.user.models import Class, Teacher
from codeforlife.user.serializers import StudentSerializer as _StudentSerializer
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class StudentSerializer(_StudentSerializer):
    klass = serializers.CharField(source="class_field.access_code")

    class Meta(_StudentSerializer.Meta):
        pass

    # pylint: disable-next=missing-function-docstring
    def validate_klass(self, value: str):
        # Only teachers can manage students.
        teacher = t.cast(Teacher, self.request_user.teacher)

        if teacher.school is None:
            raise serializers.ValidationError(
                "The requesting teacher must be in a school."
            )

        queryset = Class.objects.filter(access_code=value)
        if not queryset.filter(teacher__school=teacher.school_id).exists():
            raise serializers.ValidationError(
                "Class must belong to the same school as requesting teacher."
            )
        if (
            not teacher.is_admin
            and not queryset.filter(teacher=teacher).exists()
        ):
            raise serializers.ValidationError(
                "The requesting teacher must be an admin or own the class."
            )

        return value

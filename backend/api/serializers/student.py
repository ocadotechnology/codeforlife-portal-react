"""
© Ocado Group
Created on 29/01/2024 at 10:14:59(+00:00).
"""

from codeforlife.user.models import Class
from codeforlife.user.serializers import StudentSerializer as _StudentSerializer
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class StudentSerializer(_StudentSerializer):
    klass = serializers.CharField(source="class_field.access_code")

    class Meta(_StudentSerializer.Meta):
        pass

    # pylint: disable-next=missing-function-docstring
    def validate_klass(self, value: str):
        if self.request_user.teacher is None:
            raise serializers.ValidationError(
                "Only a teacher can assign a student to class."
            )
        if self.request_user.teacher.school is None:
            raise serializers.ValidationError(
                "The requesting teacher must be in a school."
            )
        if not Class.objects.filter(
            access_code=value,
            teacher__school=self.request_user.teacher.school_id,
        ).exists():
            raise serializers.ValidationError(
                "Class must belong to the same school as requesting teacher."
            )

        return value

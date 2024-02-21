"""
© Ocado Group
Created on 29/01/2024 at 10:14:59(+00:00).
"""

import typing as t

from codeforlife.user.models import Class, User
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
        teacher = self.request_school_teacher_user.teacher

        try:
            klass = Class.objects.get(access_code=value)
        except Class.DoesNotExist as ex:
            raise serializers.ValidationError(
                "Class does not exist.", code="does_not_exist"
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

    def validate(self, attrs):
        instance = t.cast(t.Optional[User], self.parent.instance)
        if instance and not instance.student:
            raise serializers.ValidationError(
                "Target user is not a student.", code="not_student"
            )

        return attrs

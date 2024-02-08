"""
© Ocado Group
Created on 29/01/2024 at 10:13:58(+00:00).
"""

import typing as t

from codeforlife.user.models import User
from codeforlife.user.serializers import TeacherSerializer as _TeacherSerializer
from rest_framework import serializers


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class TeacherSerializer(_TeacherSerializer):
    class Meta(_TeacherSerializer.Meta):
        extra_kwargs = {
            **_TeacherSerializer.Meta.extra_kwargs,
            "is_admin": {"read_only": False},
        }

    # pylint: disable-next=missing-function-docstring
    def validate_is_admin(self, value: bool):
        instance = t.cast(t.Optional[User], self.parent.instance)
        if instance:
            user = self.request_school_teacher_user
            if user.pk == instance.pk:
                raise serializers.ValidationError(
                    "Cannot update own permissions.",
                    code="is_self",
                )

        return value

    def validate(self, attrs):
        instance = t.cast(t.Optional[User], self.parent.instance)
        if instance:
            if not instance.teacher:
                raise serializers.ValidationError(
                    "Target user is not a teacher",
                    code="not_teacher",
                )

            user = self.request_school_teacher_user
            if user.teacher.school != instance.teacher.school:
                raise serializers.ValidationError(
                    "Teacher is not in your school.",
                    code="not_in_school",
                )

        return attrs

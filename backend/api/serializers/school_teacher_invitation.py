"""
© Ocado Group
Created on 09/02/2024 at 16:14:00(+00:00).
"""

from datetime import timedelta
from uuid import uuid4

from codeforlife.serializers import ModelSerializer
from django.utils import timezone

from ..models import SchoolTeacherInvitation


# pylint: disable-next=missing-class-docstring,too-many-ancestors
class SchoolTeacherInvitationSerializer(
    ModelSerializer[SchoolTeacherInvitation]
):
    class Meta:
        model = SchoolTeacherInvitation
        fields = [
            "token",
            "school",
            "from_teacher",
            "invited_teacher_first_name",
            "invited_teacher_last_name",
            "invited_teacher_email",
            "invited_teacher_is_admin",
            "expiry",
        ]

    def create(self, validated_data):
        token = uuid4().hex
        user = self.request_admin_school_teacher_user

        return super().create(
            {
                "token": token,
                "school": user.teacher.school,
                "from_teacher": user.teacher,
                "invited_teacher_first_name": validated_data["first_name"],
                "invited_teacher_last_name": validated_data["last_name"],
                "invited_teacher_email": validated_data["email"],
                "invited_teacher_is_admin": validated_data["is_admin"],
                "expiry": timezone.now() + timedelta(days=30),
            }
        )

    def update(self, instance, validated_data):
        instance.expiry = timezone.now() + timedelta(days=30)
        instance.save()
        return instance

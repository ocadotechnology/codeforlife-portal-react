"""
© Ocado Group
Created on 29/01/2024 at 10:13:58(+00:00).
"""

from codeforlife.user.serializers import TeacherSerializer as _TeacherSerializer


# pylint: disable-next=missing-class-docstring
class TeacherSerializer(_TeacherSerializer):
    class Meta(_TeacherSerializer.Meta):
        pass

"""
© Ocado Group
Created on 24/01/2024 at 12:14:21(+00:00).
"""

from codeforlife.user.serializers import ClassSerializer as _ClassSerializer


# pylint: disable-next=missing-class-docstring
class ClassSerializer(_ClassSerializer):
    class Meta(_ClassSerializer.Meta):
        pass

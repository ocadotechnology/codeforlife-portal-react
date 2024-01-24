"""
© Ocado Group
Created on 23/01/2024 at 11:05:41(+00:00).
"""

from codeforlife.user.serializers import SchoolSerializer as _SchoolSerializer


# pylint: disable-next=missing-class-docstring
class SchoolSerializer(_SchoolSerializer):
    class Meta(_SchoolSerializer.Meta):
        pass

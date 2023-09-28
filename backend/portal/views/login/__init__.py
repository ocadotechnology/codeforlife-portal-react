from datetime import datetime, timedelta

import pytz
from common.models import Teacher, Student


def has_user_lockout_expired(user: Teacher or Student) -> bool:
    return datetime.now(tz=pytz.utc) - user.blocked_time > timedelta(hours=24)

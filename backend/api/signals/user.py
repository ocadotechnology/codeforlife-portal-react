"""
© Ocado Group
Created on 20/01/2024 at 11:39:26(+00:00).

All signals for the User model.
"""

from codeforlife.models.signals.pre_save import previous_values_are_unequal
from codeforlife.user.models import User
from django.db.models.signals import pre_save
from django.dispatch import receiver

# pylint: disable=unused-argument


@receiver(pre_save, sender=User)
def user__pre_save(sender, instance: User, *args, **kwargs):
    """User's pre-save logic."""

    if previous_values_are_unequal(instance, {"email"}):
        instance.username = instance.email

        # TODO: send verification email

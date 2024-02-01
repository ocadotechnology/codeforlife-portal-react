"""
© Ocado Group
Created on 20/01/2024 at 11:39:26(+00:00).

All signals for the User model.
"""

import pyotp
from codeforlife.models.signals.pre_save import (
    previous_values_are_unequal,
    was_created,
)
from codeforlife.user.models import User, UserProfile
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

# pylint: disable=unused-argument


@receiver(pre_save, sender=UserProfile)
def user__pre_save__otp_secret(sender, instance: UserProfile, *args, **kwargs):
    """Set the OTP secret for new users."""

    # TODO: move this to User.otp_secret.default when restructuring.
    if not was_created(instance):
        instance.otp_secret = pyotp.random_base32()


@receiver(pre_save, sender=User)
def user__pre_save__email(sender, instance: User, *args, **kwargs):
    """Before a user's email field is updated."""

    if instance.teacher is not None and previous_values_are_unequal(
        instance, {"email"}
    ):
        instance.username = instance.email


@receiver(post_save, sender=User)
def user__post_save__email(sender, instance: User, *args, **kwargs):
    """After a user's email field is updated."""

    # TODO: send verification email

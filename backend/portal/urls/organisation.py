from django.urls import path

from ..views.organisation import (
    organisation_create,
    organisation_leave,
)


urlpatterns = [
    path(
        "teach/onboarding-organisation/",
        organisation_create,
        name="organisation_create",
    ),
    path(
        "teach/leave-organisation/",
        organisation_leave,
        name="organisation_leave",
    ),
]

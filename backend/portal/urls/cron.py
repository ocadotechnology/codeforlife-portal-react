from rest_framework.routers import DefaultRouter

from ..views.cron import (
    ClearSessionsViewSet,
)

router = DefaultRouter()
router.register(
    "clear-sessions",
    ClearSessionsViewSet,
    basename="clear-sessions",
)

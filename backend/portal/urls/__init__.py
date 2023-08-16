from django.urls import path, include

from .cron import router as cron_router
from .dotmailer import urlpatterns as dotmailer_urlpatterns
from .email import urlpatterns as email_urlpatterns
from .home import urlpatterns as home_urlpatterns
from .login import urlpatterns as login_urlpatterns
from .registration import urlpatterns as registration_urlpatterns


urlpatterns = [
    path("cron/", include(cron_router.urls)),
    *dotmailer_urlpatterns,
    *email_urlpatterns,
    *home_urlpatterns,
    *login_urlpatterns,
    *registration_urlpatterns,
]

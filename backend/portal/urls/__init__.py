from django.urls import include, path

from .admin import urlpatterns as admin_urlpatterns
from .cron import urlpatterns as cron_urlpatterns
from .dotmailer import urlpatterns as dotmailer_urlpatterns
from .email import urlpatterns as email_urlpatterns
from .home import urlpatterns as home_urlpatterns
from .organisation import urlpatterns as organisation_urlpatterns
from .teacher.dashboard import urlpatterns as teach_dashboard_urlpatterns
from .registration import urlpatterns as registration_urlpatterns
from .student import urlpatterns as student_urlpatterns
from .teacher import urlpatterns as teacher_urlpatterns

urlpatterns = [
    path("cron/", include(cron_urlpatterns)),
    *dotmailer_urlpatterns,
    *email_urlpatterns,
    *home_urlpatterns,
    *registration_urlpatterns,
    *student_urlpatterns,
    *admin_urlpatterns,
    *organisation_urlpatterns,
    *teach_dashboard_urlpatterns,
    *teacher_urlpatterns,
]

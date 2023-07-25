from .dotmailer import urlpatterns as dotmailer_urlpatterns
from .registration import urlpatterns as registration_urlpatterns
from .email import urlpatterns as email_urlpatterns

urlpatterns = [
    *dotmailer_urlpatterns,
    *registration_urlpatterns,
    *email_urlpatterns,
]

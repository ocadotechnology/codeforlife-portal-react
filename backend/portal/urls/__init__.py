from .dotmailer import urlpatterns as dotmailer_urlpatterns
from .registration import urlpatterns as registration_urlpatterns


urlpatterns = [
    *dotmailer_urlpatterns,
    *registration_urlpatterns,
]

from .dotmailer import urlpatterns as dotmailer_urlpatterns
from .home import urlpatterns as home_urlpatterns
from .registration import urlpatterns as registration_urlpatterns


urlpatterns = [
    *dotmailer_urlpatterns,
    *home_urlpatterns,
    *registration_urlpatterns,
]

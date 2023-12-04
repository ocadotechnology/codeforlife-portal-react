from django.urls import path, include

from .teach import urlpatterns as teach_urlpatterns


urlpatterns = [
    path("teach/", include(teach_urlpatterns)),
]

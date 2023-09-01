from django.urls import path

from ..views.csrf import (
    CookieView,
)


urlpatterns = [
    path(
        "cookie/",
        CookieView.as_view(),
        name="get-csrf-cookie",
    ),
]

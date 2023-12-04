from django.urls import path

from ..views.admin import (
    AdminChangePasswordView,
    AdminChangePasswordDoneView,
)


urlpatterns = [
    path(
        "administration/password_change/",
        AdminChangePasswordView,
        name="administration_password_change",
    ),
    path(
        "administration/password_change_done/",
        AdminChangePasswordDoneView,
        name="administration_password_change_done",
    ),
]

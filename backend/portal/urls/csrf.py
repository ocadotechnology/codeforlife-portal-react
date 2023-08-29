from django.urls import path
from ..views.cron.session import get_csrf_token

urlpatterns = [path("set-csrf/", get_csrf_token, name=get_csrf_token.__name__)]

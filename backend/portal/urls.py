from django.conf.urls import url

from . import home

urlpatterns = [
    url(r"^(?!.*api/).*$", home.render_react, name="react_app"),
    url(r"api/register", home.handle_signup, name="register"),
    url(r"api/login", home.handle_signin, name="login"),
]

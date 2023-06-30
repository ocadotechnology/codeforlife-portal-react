from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^news_signup/$", views.process_newsletter_form, name="process_newsletter_form"),
    url(r".*", views.render_react, name="react_app"),
]

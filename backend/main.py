# This is the entrypoint to our app.
# https://cloud.google.com/appengine/docs/standard/python3/runtime#application_startup
from service.asgi import application as app

from common.helpers.emails import (
    add_to_dotmailer,
    get_dotmailer_user_by_email,
    send_dotmailer_consent_confirmation_email_to_user,
    add_consent_record_to_dotmailer_user,
    DotmailerUserType,
)
from django.contrib import messages as messages
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt

import json

@csrf_exempt
def process_newsletter_form(request):
    if request.method == "POST":
        form_data = json.loads(request.body.decode())
        user_email = form_data["email"]
        print(f'{form_data=}')
        add_to_dotmailer("", "", user_email, DotmailerUserType.NO_ACCOUNT)
        # messages.success(request, "Thank you for signing up! 🎉")
        return HttpResponse(status=200)
       
    return HttpResponse(status=405)

def render_react(request):
    return render(request, "portal.html")

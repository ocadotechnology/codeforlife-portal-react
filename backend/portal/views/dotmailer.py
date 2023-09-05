from common.helpers.emails import (
    DotmailerUserType,
    add_consent_record_to_dotmailer_user,
    add_to_dotmailer,
    get_dotmailer_user_by_email,
    send_dotmailer_consent_confirmation_email_to_user,
)
from django.contrib import messages as messages
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import HttpResponse, JsonResponse


def process_newsletter_form(request):
    if request.method == "POST":
        form_data = request.POST
        user_email = form_data["email"]
        try:
            validate_email(user_email)
        except ValidationError:
            return JsonResponse(status=200, data={"success": False})
        else:
            add_to_dotmailer("", "", user_email, DotmailerUserType.NO_ACCOUNT)
            return JsonResponse(status=200, data={"success": True})

    return HttpResponse(status=405)


def dotmailer_consent_form(request):
    if request.method == "POST":
        form_data = request.POST
        user_email = form_data["email"]
        try:
            user = get_dotmailer_user_by_email(user_email)
            add_consent_record_to_dotmailer_user(user)
        except:
            # if no user is registered with that email, show error message
            return JsonResponse(status=200, data={"success": False})
        else:
            # no error
            send_dotmailer_consent_confirmation_email_to_user(user)
            return JsonResponse(status=200, data={"success": True})

    return HttpResponse(status=405)

import logging
import math

from common import email_messages
from common.helpers.emails import (
    NOTIFICATION_EMAIL,
    DotmailerUserType,
    add_to_dotmailer,
    send_email,
    send_verification_email,
)
from common.models import Student, Teacher, DynamicElement
from common.permissions import logged_in_as_student, logged_in_as_teacher
from common.utils import _using_two_factor
from django.contrib import messages as messages
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.utils.html import format_html
from django.views.decorators.cache import cache_control

from deploy import captcha
from portal.forms.play import IndependentStudentSignupForm
from portal.forms.teach import TeacherSignupForm
from portal.helpers.captcha import remove_captcha_from_forms
from portal.helpers.ratelimit import (
    RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_GROUP,
    RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_RATE,
    is_ratelimited,
)

LOGGER = logging.getLogger(__name__)


def redirect_teacher_to_correct_page(request, teacher):
    # this view will be handled on the frontend
    return JsonResponse({"message": "this view is not used anymore", "status": 200})
    if teacher.has_school():
        link = reverse("two_factor:profile")
        if not _using_two_factor(request.user):
            messages.info(
                request,
                (
                    "You are not currently set up with two-factor authentication. "
                    + "Use your phone or tablet to enhance your account’s security.</br>"
                    + "Click <a href='"
                    + link
                    + "'>here</a> to find out more and "
                    + "set it up or go to your account page at any time."
                ),
                extra_tags="safe",
            )
        return reverse_lazy("dashboard")
    else:
        return reverse_lazy("onboarding-organisation")


def process_signup_form(request, data):
    email = data["teacher_email"]

    if email and User.objects.filter(email=email).exists():
        email_message = email_messages.userAlreadyRegisteredEmail(request, email)
        is_email_ratelimited = is_ratelimited(
            request=request,
            group=RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_GROUP,
            key=lambda *_: email,
            rate=RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_RATE,
            increment=True,
        )

        if not is_email_ratelimited:
            send_email(
                NOTIFICATION_EMAIL,
                [email],
                email_message["subject"],
                email_message["message"],
                email_message["subject"],
            )
        else:
            LOGGER.warn(
                f"Ratelimit teacher {RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_GROUP}: {email}"
            )
    else:
        teacher = Teacher.objects.factory(
            first_name=data["teacher_first_name"],
            last_name=data["teacher_last_name"],
            email=data["teacher_email"],
            password=data["teacher_password"],
        )
        send_verification_email(request, teacher.user.user, data)

    return JsonResponse({"success": True}, status=200)
    return render(
        request,
        "portal/email_verification_needed.html",
        {"usertype": "TEACHER"},
        status=302,
    )


def process_independent_student_signup_form(request, data):
    email = data["email"]

    if email and User.objects.filter(email=email).exists():
        email_message = email_messages.userAlreadyRegisteredEmail(
            request, email, is_independent_student=True
        )
        is_email_ratelimited = is_ratelimited(
            request=request,
            group=RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_GROUP,
            key=lambda *_: email,
            rate=RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_RATE,
            increment=True,
        )

        if not is_email_ratelimited:
            send_email(
                NOTIFICATION_EMAIL,
                [email],
                email_message["subject"],
                email_message["message"],
                email_message["subject"],
            )
        else:
            LOGGER.warning(
                f"Ratelimit independent {RATELIMIT_USER_ALREADY_REGISTERED_EMAIL_GROUP}: {email}"
            )
        return render(
            request,
            "portal/email_verification_needed.html",
            {"usertype": "INDEP_STUDENT"},
            status=302,
        )

    student = Student.objects.independentStudentFactory(
        name=data["name"], email=data["email"], password=data["password"]
    )

    dob = data["date_of_birth"]
    age_in_days = timezone.now().date() - dob
    age = math.floor(age_in_days.days / 365.25)

    send_verification_email(request, student.new_user, data, age=age)

    return JsonResponse({"success": True}, status=200)

    return render(
        request,
        "portal/email_verification_needed.html",
        {"usertype": "INDEP_STUDENT"},
        status=302,
    )


def render_signup_form(request):
    invalid_form = False

    teacher_signup_form = TeacherSignupForm(prefix="teacher_signup")
    independent_student_signup_form = IndependentStudentSignupForm(
        prefix="independent_student_signup"
    )

    if request.method == "POST":
        if "teacher_signup-teacher_email" in request.POST:
            teacher_signup_form = TeacherSignupForm(
                request.POST, prefix="teacher_signup"
            )

            if 1:  # not captcha.CAPTCHA_ENABLED:
                remove_captcha_from_forms(teacher_signup_form)

            if teacher_signup_form.is_valid():
                data = teacher_signup_form.cleaned_data
                return process_signup_form(request, data)
            else:
                print(f"Teacher Signup Form Errors: {dict(teacher_signup_form.errors)}")

        else:
            independent_student_signup_form = IndependentStudentSignupForm(
                request.POST, prefix="independent_student_signup"
            )
            if 1:  # not captcha.CAPTCHA_ENABLED:
                remove_captcha_from_forms(independent_student_signup_form)

            if independent_student_signup_form.is_valid():
                data = independent_student_signup_form.cleaned_data
                return process_independent_student_signup_form(request, data)

    return JsonResponse({"finished": True})


def redirect_teacher_to_correct_page(request, teacher):
    if teacher.has_school():
        link = reverse("two_factor:profile")
        if not _using_two_factor(request.user):
            messages.info(
                request,
                (
                    "You are not currently set up with two-factor authentication. "
                    + "Use your phone or tablet to enhance your account’s security.</br>"
                    + "Click <a href='"
                    + link
                    + "'>here</a> to find out more and "
                    + "set it up or go to your account page at any time."
                ),
                extra_tags="safe",
            )
        return reverse_lazy("dashboard")
    else:
        return reverse_lazy("onboarding-organisation")


def logout(request):
    response = JsonResponse({"success": False}, status=400)
    if request.user.is_authenticated:
        logout(request)
        response = JsonResponse({"success": True}, status=200)
    return response


from portal.views.teacher.teach import count_student_pack_downloads_click
from portal.templatetags.app_tags import cloud_storage
from portal.views.teacher.teach import DownloadType


def download_student_pack(request, student_pack_type):
    if request.method == "POST":
        count_student_pack_downloads_click(int(student_pack_type))
        link = (
            cloud_storage("club_packs/PythonCodingClub.zip")
            if DownloadType(int(student_pack_type)) == DownloadType.PYTHON_PACK
            else cloud_storage("club_packs/PrimaryCodingClub.zip")
        )
        return JsonResponse({"link": link}, status=200)
    return JsonResponse({"message": "method not allowed"}, status=405)


def reset_screentime_warning(request):
    if request.user.is_authenticated:
        request.session["last_screentime_warning"] = timezone.now().timestamp()
    return JsonResponse({"success": True}, status=204)  # No content


@cache_control(private=True)
def banner_message(request):
    # Putting this in a try catch because it causes some weird issue in the tests where the first Selenium test passes,
    # but any following test fails because it cannot find the Maintenance banner instance.

    # 12 July 2023 18:11 - I am leaving this as is in case it breaks the tests?
    try:
        maintenance_banner = DynamicElement.objects.get(name="Maintenance banner")

        if maintenance_banner.active:
            messages.info(
                request, format_html(maintenance_banner.text), extra_tags="safe"
            )
    except ObjectDoesNotExist:
        pass

    """
    This view is where we can add any messages to be shown upon loading the home page.
    Following this format:

    messages.success(request, "message text here", extra_tags="tag classes here")

    This example uses the success function which will display a welcoming message on the
    sub banner (right under the page header). Other functions can be used to indicate a
    warning, an error or a simple information.
    """
    last_banner = DynamicElement.objects.all().last()
    return JsonResponse(
        {
            "name": last_banner.name,
            "text": last_banner.text,
            "active": last_banner.active,
        },
        status=200,
    )

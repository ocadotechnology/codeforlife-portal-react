from common.helpers.emails import (
    update_indy_email,
)
from django.contrib import messages as messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponse
from django.urls import reverse_lazy
from django.views.generic.edit import FormView

from portal.forms.play import (
    StudentEditAccountForm,
    IndependentStudentEditAccountForm,
)
from portal.forms.registration import DeleteAccountForm
from rest_framework import status

from portal.helpers.password import check_update_password
from portal.helpers.ratelimit import clear_ratelimit_cache_for_user
from django.contrib import messages as messages


# def _get_form(self, form_class):
#     """
#     Generic function which gets the appropriate edit account details form for either
#     a school student or an independent student.
#     :param self: The view class the form is used in.
#     :param form_class: The form class which corresponds to the type of student.
#     :return: The initialised form which can then be used in the FormView.
#     """
#     user = self.request.user
#     if form_class is None:
#         form_class = self.get_form_class()
#     return form_class(user, **self.get_form_kwargs())


# def _process_form(self, process_function, form, view):
#     """
#     Generic function which processes the appropriate edit account details form for
#     either a school student or an independent student.
#     :param self: The view class the form is used in.
#     :param process_function: The core function that is needed to process the form.
#     :param form: The form which needs to be processed.
#     :param view: The view object.
#     :return: The view once the form is valid and has been submitted.
#     """
#     student = self.request.user.new_student
#     process_function(form, student, self.request)
#     return super(view, self).form_valid(form)


class SchoolStudentEditAccountView(LoginRequiredMixin, FormView):
    """
    A FormView for editing a school student's account details. This forms enables a
    school student to change their password.
    """

    def post(self, request):
        form = StudentEditAccountForm(request.user, request.POST)
        if form.is_valid():
            response = self.process_student_edit_account_form(form, request)
            if response:
                return response
            return JsonResponse(
                {
                    "notification": [
                        "Your account details have been changed successfully."
                    ]
                },
                status=200,
            )
        return JsonResponse({"errors": form.errors}, status=400)

    def process_student_edit_account_form(self, form, request):
        data = form.cleaned_data
        student = (
            self.request.user
        )  # Assuming the student is the logged-in user
        changing_password = check_update_password(form, student, request, data)

        if changing_password:
            logout(request)

    # form_class = StudentEditAccountForm
    # template_name = "../templates/portal/play/student_edit_account.html"
    # success_url = reverse_lazy("student_details")
    # model = Student

    # def form_valid(self, form):
    #     return _process_form(
    #         self,
    #         self.process_student_edit_account_form,
    #         form,
    #         SchoolStudentEditAccountView,
    #     )

    # def process_student_edit_account_form(self, form, student, request):
    #     data = form.cleaned_data
    #     # check not default value for CharField
    #     changing_password = check_update_password(
    #         form, student.new_user, request, data
    #     )

    #     messages.success(
    #         request, "Your account details have been changed successfully."
    #     )

    #     if changing_password:
    #         logout(request)
    #         messages.success(
    #             request,
    #             "Please login using your new password.",
    #         )
    #         return HttpResponseRedirect(
    #             reverse_lazy("student_login_access_code")
    #         )

    # def get_form(self, form_class=None):
    #     return _get_form(self, form_class)


# ------------

# class SchoolStudentEditAccountView(LoginRequiredMixin, FormView):
#     """
#     A FormView for editing a school student's account details. This forms enables a
#     school student to change their password.
#     """

#     login_url = reverse_lazy("student_login_access_code")
#     form_class = StudentEditAccountForm
#     success_url = reverse_lazy("student_details")
#     model = Student

#     def form_valid(self, form):
#         return _process_form(
#             self,
#             self.process_student_edit_account_form,
#             form,
#             SchoolStudentEditAccountView,
#         )

#     def process_student_edit_account_form(self, form, student, request):
#         data = form.cleaned_data
#         # check not default value for CharField
#         changing_password = check_update_password(
#             form, student.new_user, request, data
#         )

#         messages.success(
#             request, "Your account details have been changed successfully."
#         )

#         if changing_password:
#             logout(request)
#             messages.success(
#                 request,
#                 "Please login using your new password.",
#             )
#             return HttpResponseRedirect(
#                 reverse_lazy("student_login_access_code")
#             )

#     def get_form(self, form_class=None):
#         return _get_form(self, form_class)


def process_change_email_password_form(request, student):
    change_email_password_form = IndependentStudentEditAccountForm(
        request.user, request.POST
    )

    if change_email_password_form.is_valid():
        data = change_email_password_form.cleaned_data

        changing_password = check_update_password(
            change_email_password_form, student, request, data
        )
        changing_email, new_email = update_indy_email(student, request, data)
        changing_first_name = request.POST["name"] != student.first_name

        student.first_name = request.POST["name"]
        student.save()

        # Reset ratelimit cache after successful account details update
        clear_ratelimit_cache_for_user(student.username)

        return (
            changing_email,
            new_email,
            changing_password,
            changing_first_name,
        )
    else:
        return False, "", False, False


def process_student_edit_account_form(request):
    form_class = StudentEditAccountForm(request.user, request.POST)
    if form_class.is_valid():
        data = form_class.cleaned_data
        check_update_password(form_class, request.user, request, data)
    else:
        notification = form_class.errors["__all__"][0]
        return JsonResponse(
            {"error": notification}, status=status.HTTP_400_BAD_REQUEST
        )
    # messages.success(
    #     request, "Your account details have been changed successfully."
    # )

    # if changing_password:
    #     logout(request)
    #     messages.success(
    #         request,
    #         "Please login using your new password.",
    #     )
    return HttpResponse()


def change_school_student_details(request):
    return process_student_edit_account_form(request)


@login_required(login_url=reverse_lazy("independent_student_login"))
def change_independent_details(request):
    change_email_password_form = IndependentStudentEditAccountForm(
        request.user, request.POST
    )

    if not change_email_password_form.is_valid():
        return JsonResponse(
            {
                "notification": "Your account was not updated due to incorrect details",
            },
            status=400,
        )

    # (
    #     changing_email,
    #     new_email,
    #     changing_password,
    #     changing_first_name,
    #     _,
    # ) =
    process_change_email_password_form(request, request.user, "")

    # if changing_email or changing_password:
    #     logout(request)

    return HttpResponse()


def delete_independent_account(request):
    if request.method == "POST":
        user = request.user
        notification = ""
        delete_account_form = DeleteAccountForm(user, request.POST)
        if not delete_account_form.is_valid():
            # messages.warning(
            #     request,
            #     "Your account was not deleted due to incorrect password.",
            # )
            notification = (
                "Your account was not deleted due to incorrect password"
            )
        else:
            notification = "Your account was successfully deleted"
            logout(request)
    return JsonResponse({"notification": notification})


# def independentStudentEditAccountView(request):
#     """
#     A FormView for editing an independent student's account details. This forms enables
#     an independent student to change their name, their email and / or their password.
#     Additionally it also deletes the independent students account with its second form

#     Django class based views makes it very difficult to have multiple forms in one view,
#     hence using the functional based view
#     """
#     user = request.user
#     change_email_password_form = IndependentStudentEditAccountForm(
#         user, initial={"name": user.first_name}
#     )
#     delete_account_form = DeleteAccountForm(user)
#     template_name = "../templates/portal/play/student_edit_account.html"
#     delete_account_confirm = False

#     def process_change_email_password_form(request, student, old_anchor):
#         change_email_password_form = IndependentStudentEditAccountForm(
#             request.user, request.POST
#         )
#         changing_email = False
#         changing_password = False
#         new_email = ""
#         if change_email_password_form.is_valid():
#             data = change_email_password_form.cleaned_data
#             # check not default value for CharField
#             changing_password = check_update_password(
#                 change_email_password_form, student, request, data
#             )

#             changing_email, new_email = update_indy_email(
#                 student, request, data
#             )
#             changing_first_name = (
#                 False if request.POST["name"] == student.first_name else True
#             )
#             student.first_name = request.POST["name"]

#             student.save()

#             anchor = ""

#             # Reset ratelimit cache after successful account details update
#             clear_ratelimit_cache_for_user(student.username)

#             messages.success(
#                 request, "Your account details have been successfully changed."
#             )
#         else:
#             anchor = old_anchor

#         return (
#             changing_email,
#             new_email,
#             changing_password,
#             changing_first_name,
#             anchor,
#         )

#     if request.method == "POST":
#         if "delete_account" in request.POST:
#             delete_account_form = DeleteAccountForm(user, request.POST)
#             if not delete_account_form.is_valid():
#                 messages.warning(
#                     request,
#                     "Your account was not deleted due to incorrect password.",
#                 )
#             else:
#                 delete_account_confirm = True
#         else:
#             change_email_password_form = IndependentStudentEditAccountForm(
#                 request.user, request.POST
#             )
#             if not change_email_password_form.is_valid():
#                 messages.warning(
#                     request,
#                     "Your account was not updated do to incorrect details",
#                 )
#                 return render(
#                     request,
#                     template_name,
#                     {
#                         "form": change_email_password_form,
#                         "delete_account_form": delete_account_form,
#                     },
#                 )
#             else:
#                 (
#                     changing_email,
#                     new_email,
#                     changing_password,
#                     changing_first_name,
#                     anchor,
#                 ) = process_change_email_password_form(
#                     request, request.user, ""
#                 )
#                 if changing_email:
#                     logout(request)
#                     messages.success(
#                         request,
#                         "Your account details have been changed successfully.",
#                     )
#                     messages.success(
#                         request,
#                         "Your email will be changed once you have verified it, until then "
#                         "you can still log in with your old email.",
#                     )
#                     return render(
#                         request,
#                         "portal/email_verification_needed.html",
#                         {"usertype": "INDEP_STUDENT"},
#                     )
#                 if changing_password:
#                     logout(request)
#                     messages.success(
#                         request,
#                         "Your account details have been changed successfully.",
#                     )
#                     messages.success(
#                         request, "Please login using your new password."
#                     )
#                     return HttpResponseRedirect(
#                         reverse_lazy("independent_student_login")
#                     )

#                 if changing_first_name:
#                     messages.success(
#                         request,
#                         "Your account details have been changed successfully.",
#                     )
#                     return HttpResponseRedirect(
#                         reverse_lazy("independent_student_details")
#                     )

#     return render(
#         request,
#         template_name,
#         {
#             "form": change_email_password_form,
#             "delete_account_form": delete_account_form,
#             "delete_account_confirm": delete_account_confirm,
#         },
#     )


# @login_required(login_url=reverse_lazy("home"))
# @user_passes_test(logged_in_as_student, login_url=reverse_lazy("home"))
# def student_edit_account(request):
#     student = request.user.new_student
#     if student.is_independent():
#         return HttpResponseRedirect(reverse_lazy("independent_edit_account"))
#     else:
#         return HttpResponseRedirect(reverse_lazy("school_student_edit_account"))
import common.permissions as permissions
from common.models import School, Teacher, Class
from django.contrib import messages as messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy


@login_required(login_url=reverse_lazy("session-expired"))
@user_passes_test(permissions.logged_in_as_teacher, login_url=reverse_lazy("session-expired"))
def organisation_create(request):
    teacher = request.user.new_teacher

    if request.method == "POST":
        form_data = request.POST
        name = form_data["name"]
        postcode = form_data["postcode"].upper()
        country = form_data["country"]

        school = School.objects.create(name=name, postcode=postcode, country=country)

        teacher.school = school
        teacher.is_admin = True
        teacher.save()

        return HttpResponse(status=201)

    return HttpResponse(status=405)


@login_required(login_url=reverse_lazy("session-expired"))
@user_passes_test(permissions.logged_in_as_teacher, login_url=reverse_lazy("session-expired"))
def organisation_leave(request):
    teacher = request.user.new_teacher

    check_teacher_is_not_admin(teacher)

    if request.method == "POST":
        # TODO: check its FE callpoint
        # classes = Class.objects.filter(teacher=teacher)
        # for klass in classes:
        #     teacher_id = request.POST.get(klass.access_code, None)
        #     if teacher_id:
        #         new_teacher = get_object_or_404(Teacher, id=teacher_id)
        #         klass.teacher = new_teacher
        #         klass.save()

        classes = Class.objects.filter(teacher=teacher)
        teachers = Teacher.objects.filter(school=teacher.school).exclude(id=teacher.id)

        if classes.exists():
            # TODO: return new teachers to FE
            pass
        else:
            teacher.school = None
            teacher.save()

        return HttpResponse(status=204)

    return HttpResponse(status=405)

def check_teacher_is_not_admin(teacher):
    if teacher.is_admin:
        return HttpResponse(status=404)

import common.permissions as permissions
from common.models import School, Teacher, Class
from django.contrib import messages as messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from rest_framework import status
from django.views.decorators.http import require_POST
from django.db.models import F


@require_POST
@login_required(login_url=reverse_lazy("session-expired"))
@user_passes_test(
    permissions.logged_in_as_teacher, login_url=reverse_lazy("session-expired")
)
def organisation_create(request):
    teacher = request.user.new_teacher

    form_data = request.POST
    name = form_data["name"]
    postcode = form_data["postcode"].upper()
    country = form_data["country"]

    school = School.objects.create(
        name=name, postcode=postcode, country=country
    )

    teacher.school = school
    teacher.is_admin = True
    teacher.save()

    return HttpResponse(status=status.HTTP_201_CREATED)


@require_POST
@login_required(login_url=reverse_lazy("session-expired"))
@user_passes_test(
    permissions.logged_in_as_teacher, login_url=reverse_lazy("session-expired")
)
def organisation_leave(request):
    teacher = request.user.new_teacher

    # check teacher is not admin
    if teacher.is_admin:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    classes = Class.objects.filter(teacher=teacher)
    for klass in classes:
        teacher_id = request.POST.get(klass.access_code.lower(), None)
        teacher_id = int(teacher_id) if teacher_id else None
        if teacher_id:
            new_teacher = get_object_or_404(Teacher, id=teacher_id)
            klass.teacher = new_teacher
            klass.save()

    classes = Class.objects.filter(teacher=teacher)
    if classes.exists():
        classes = classes.values(
            "name",
            "access_code",
            class_teacher_first_name=F("teacher__new_user__first_name"),
            class_teacher_last_name=F("teacher__new_user__last_name"),
            class_teacher_id=F("teacher__id"),
        )
        coworkers = (
            Teacher.objects.filter(school=teacher.school)
            .exclude(id=teacher.id)
            .values(
                "id",
                is_teacher_admin=F("is_admin"),
                teacher_first_name=F("new_user__first_name"),
                teacher_last_name=F("new_user__last_name"),
                teacher_email=F("new_user__email"),
            )
        )
        teacher = {
            "id": teacher.id,
            "is_admin": teacher.is_admin,
            "teacher_first_name": teacher.new_user.first_name,
            "teacher_last_name": teacher.new_user.last_name,
            "teacher_email": teacher.new_user.email,
        }

        return JsonResponse(
            data={
                "source": "organisationLeave",
                "teacher": teacher,
                "classes": list(classes),
                "coworkers": list(coworkers),
            },
        )

    teacher.school = None
    teacher.save()

    return HttpResponse()

from django.urls import path
from portal.views.student import compute_rapid_router_scores, handle_rapid_router_scores

urlpatterns = [
   path("student/rapid_router_scores/", handle_rapid_router_scores, name="rr_scores" ) 
]

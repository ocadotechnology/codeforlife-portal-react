from django.urls import path
from portal.views.student import handle_rapid_router_scores, handle_kurono_game_data

urlpatterns = [
   path("student/rapid_router_scores/", handle_rapid_router_scores, name="rr_scores" ),
   path("student/kurono_game_data/", handle_kurono_game_data, name="kurono_game_data" ) 
]

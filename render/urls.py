from django.urls import path

from render.views import MarkersMapView

app_name = "render"

urlpatterns = [
    path('', MarkersMapView.as_view()),
]


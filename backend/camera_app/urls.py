from django.urls import path
from . import views

urlpatterns = [
    path("", views.camera_list, name="camera_list"),
    path("stream/<int:camera_id>/", views.stream_camera, name="stream_camera"),
    path("add/", views.add_camera, name="add_camera"),
    path("<int:camera_id>/", views.delete_camera, name="delete_camera"),

]

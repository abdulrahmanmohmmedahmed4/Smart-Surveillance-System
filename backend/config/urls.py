from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

def index(request):
    return HttpResponse("Backend API is running.")

urlpatterns = [
    path('', index),  # ✅ صفحة بسيطة على /
    path('admin/', admin.site.urls),
    path('api/cameras/', include('camera_app.urls')),
    path('api/auth/', include('auth_app.urls')),
]

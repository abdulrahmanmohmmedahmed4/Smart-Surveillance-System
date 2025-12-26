from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Camera

@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    list_display = ['name', 'rtsp_url', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name']

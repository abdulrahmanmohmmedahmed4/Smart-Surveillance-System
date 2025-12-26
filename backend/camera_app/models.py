# from django.db import models

# class Camera(models.Model):
#     name = models.CharField(max_length=100)
#     rtsp_url = models.CharField(max_length=500)
#     status = models.CharField(max_length=20, default='offline')
#     created_at = models.DateTimeField(auto_now_add=True)
# backend/camera_app/models.py
from django.db import models
from django.contrib.auth.models import User

class Organization(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Camera(models.Model):
    CAMERA_TYPES = [
        ('phone', 'هاتف محمول'),
        ('ip', 'كاميرا IP'),
        ('usb', 'USB Webcam'),
        ('test', 'فيديو تجريبي'),
    ]
    
    STATUS_CHOICES = [
        ('online', 'متصل'),
        ('offline', 'غير متصل'),
        ('maintenance', 'صيانة'),
    ]
    
    name = models.CharField(max_length=200)
    rtsp_url = models.CharField(max_length=500)
    camera_type = models.CharField(max_length=20, choices=CAMERA_TYPES, default='test')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='offline')
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, default=1)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_ping = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

class Alert(models.Model):
    ALERT_TYPES = [
        ('motion', 'حركة'),
        ('sound', 'صوت'),
        ('tamper', 'تلاعب'),
        ('disconnected', 'انقطاع'),
    ]
    
    camera = models.ForeignKey(Camera, on_delete=models.CASCADE)
    alert_type = models.CharField(max_length=20, choices=ALERT_TYPES)
    severity = models.CharField(max_length=20, choices=[('low', 'منخفض'), ('medium', 'متوسط'), ('high', 'عالي')], default='medium')
    message = models.TextField()
    image_snapshot = models.ImageField(upload_to='alerts/', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.camera.name} - {self.get_alert_type_display()}"

class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    camera = models.ForeignKey(Camera, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    last_activity = models.DateTimeField(auto_now=True)

# import cv2
# import numpy as np
# from django.http import JsonResponse, StreamingHttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.gzip import gzip_page
# from .models import Camera
#
# # هذه الدالة ضرورية للـ URLs
# @csrf_exempt
# def camera_list(request):
#     cameras = list(Camera.objects.values("id", "name", "rtsp_url"))
#     return JsonResponse(cameras, safe=False)
#
# # دالة الـ Stream
# @csrf_exempt
# @gzip_page
# def stream_camera(request, camera_id: int):
#     try:
#         cam = Camera.objects.get(pk=camera_id)
#         cap = cv2.VideoCapture(cam.rtsp_url)
#
#         if not cap.isOpened():
#             cap.release()
#             return JsonResponse({"error": f"لا يمكن الاتصال بـ {cam.rtsp_url}"}, status=500)
#
#         def gen():
#             while True:
#                 ret, frame = cap.read()
#                 if not ret:
#                     break
#                 ret, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
#                 if ret:
#                     yield (b'--frame\r\n'
#                            b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n')
#
#         return StreamingHttpResponse(gen(), content_type='multipart/x-mixed-replace; boundary=frame')
#
#     except Camera.DoesNotExist:
#         return JsonResponse({"error": "الكاميرا غير موجودة"}, status=404)
#
#
#
#
# backend/camera_app/views.py
import cv2
import numpy as np
import requests
from django.http import JsonResponse, StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.gzip import gzip_page
from .models import Camera

PHONE_CAMERAS = [
    "http://192.168.1.50:8080/video",  # IP Webcam هاتف 1
    "http://192.168.1.51:8080/video",  # IP Webcam هاتف 2
    "http://192.168.43.50:8080/video", # Hotspot
    "0",  # Webcam محلية
]

@csrf_exempt
def camera_list(request):
    # احذف "type" من هنا
    cameras = list(Camera.objects.values("id", "name", "rtsp_url", "status"))
    return JsonResponse(cameras, safe=False)


@csrf_exempt
@gzip_page
def stream_camera(request, camera_id):
    try:
        cam = Camera.objects.get(pk=camera_id)
        source = cam.rtsp_url

        # جرب كاميرا الهاتف أو أي مصدر HTTP/MJPEG
        if source.startswith('http') or source in PHONE_CAMERAS:
            cap = cv2.VideoCapture(source)
            if cap.isOpened():
                def gen_http_stream():
                    while True:
                        ret, frame = cap.read()
                        if not ret: break
                        ret, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
                        if ret:
                            yield b'--frame\r\n'
                            yield b'Content-Type: image/jpeg\r\n\r\n'
                            yield jpeg.tobytes()
                            yield b'\r\n'
                cap.release()
                return StreamingHttpResponse(gen_http_stream(),
                                          content_type='multipart/x-mixed-replace; boundary=frame')

        # جرب RTSP
        cap = cv2.VideoCapture(source)
        if cap.isOpened():
            def gen_rtsp_stream():
                while True:
                    ret, frame = cap.read()
                    if not ret: break
                    ret, jpeg = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
                    if ret:
                        yield b'--frame\r\n'
                        yield b'Content-Type: image/jpeg\r\n\r\n'
                        yield jpeg.tobytes()
                        yield b'\r\n'
            return StreamingHttpResponse(gen_rtsp_stream(),
                                       content_type='multipart/x-mixed-replace; boundary=frame')

        # الفيديو التجريبي المضمون (لو فشل كل شيء)
        cap.release()
        def gen_test_video():
            frame_count = 0
            while True:
                frame = np.zeros((480, 640, 3), dtype=np.uint8)
                # عنوان المؤسسة
                cv2.putText(frame, "مؤسسة المراقبة الذكية", (100, 50),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
                # دائرة متحركة
                cx = 320 + int(100 * np.sin(frame_count * 0.3))
                cy = 240 + int(100 * np.cos(frame_count * 0.2))
                cv2.circle(frame, (cx, cy), 80, (0, 255, 255), -1)
                # حالة
                cv2.putText(frame, "جاري الاتصال بالكاميرا...", (100, 450),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 2)

                ret, jpeg = cv2.imencode('.jpg', frame)
                if ret:
                    yield b'--frame\r\n'
                    yield b'Content-Type: image/jpeg\r\n\r\n'
                    yield jpeg.tobytes()
                    yield b'\r\n'
                frame_count += 1

        return StreamingHttpResponse(gen_test_video(),
                                   content_type='multipart/x-mixed-replace; boundary=frame')

    except Camera.DoesNotExist:
        return JsonResponse({"error": "الكاميرا غير موجودة"}, status=404)



from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def add_camera(request):
    camera = Camera.objects.create(
        name=request.data.get('name', 'كاميرا جديدة'),
        rtsp_url=request.data.get('rtsp_url', 'test'),
        type=request.data.get('type', 'test')
    )
    return Response({'id': camera.id})

@api_view(['DELETE'])
def delete_camera(request, camera_id):
    Camera.objects.get(id=camera_id).delete()
    return Response({'status': 'deleted'})


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Camera
import json

@csrf_exempt
def add_camera(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        camera = Camera.objects.create(
            name=data.get('name', 'كاميرا جديدة'),
            rtsp_url=data.get('rtsp_url', 'test')
        )
        return JsonResponse({'id': camera.id, 'status': 'created'})
    return JsonResponse({'error': 'POST only'}, status=405)

@csrf_exempt
def delete_camera(request, camera_id):
    if request.method == 'DELETE':
        Camera.objects.filter(id=camera_id).delete()
        return JsonResponse({'status': 'deleted'})
    return JsonResponse({'error': 'DELETE only'}, status=405)

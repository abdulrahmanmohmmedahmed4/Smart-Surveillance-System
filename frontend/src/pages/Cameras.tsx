import { useState, useEffect } from 'react';
import { getCameras } from '../services/cameraService';
import { AppLayout } from '../components/layout/AppLayout';
import './Cameras.styles.css';

export default function Cameras() {
  const [cameras, setCameras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);

  const content = () => {
    if (loading) {
      return (
        <div className="cameras__loading">
          <div className="cameras__spinner" />
          <span>جاري تحميل قائمة الكاميرات...</span>
        </div>
      );
    }

    if (error) {
      return <div className="cameras__error">{error}</div>;
    }

    if (cameras.length === 0) {
      return (
        <div className="cameras__empty">
          <h3>لا توجد كاميرات مسجلة حالياً</h3>
          <p>
            يمكنك إضافة كاميرات من خلال لوحة الإدارة في الباك اند، وسيتم لاحقاً
            ربط هذه الواجهة مباشرة بعمليات الإضافة.
          </p>
          <a
            href="http://localhost:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="cameras__admin-link"
          >
            فتح لوحة إدارة Django
          </a>
        </div>
      );
    }

    return (
      <>
        <div className="cameras__grid">
          {cameras.map((camera) => (
            <article
              key={camera.id}
              className="cameras__card"
              onClick={() => setSelectedCamera(camera)}
            >
              <div className="cameras__preview">
                <img
                  src={`http://localhost:8000/api/cameras/stream/${camera.id}/`}
                  alt={camera.name}
                />
                <div className="cameras__preview-gradient" />
                <div className="cameras__preview-meta">
                  <span className="cameras__preview-title">{camera.name}</span>
                  <span className="cameras__preview-sub">
                    📹{' '}
                    {camera.rtsp_url?.length > 40
                      ? `${camera.rtsp_url.slice(0, 40)}...`
                      : camera.rtsp_url || 'عنوان بث تجريبي'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {selectedCamera && (
          <div
            className="cameras__modal-backdrop"
            onClick={() => setSelectedCamera(null)}
          >
            <div
              className="cameras__modal glass-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cameras__modal-header">
                <div>
                  <h2>{selectedCamera.name}</h2>
                  <p>
                    تكبير تجريبي للبث الحي، سيتم تحسينه لاحقاً مع مشغّل فيديو
                    مخصص وربط أفضل مع الباك اند.
                  </p>
                </div>
                <button
                  type="button"
                  className="cameras__modal-close"
                  onClick={() => setSelectedCamera(null)}
                >
                  إغلاق
                </button>
              </div>
              <div className="cameras__modal-body">
                <img
                  src={`http://localhost:8000/api/cameras/stream/${selectedCamera.id}/`}
                  alt={selectedCamera.name}
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token ? 'موجود' : 'غير موجود');

        if (!token) {
          setError('يرجى تسجيل الدخول أولاً');
          setLoading(false);
          return;
        }

        const camerasData = await getCameras(token);
        console.log('عدد الكاميرات:', camerasData.length);
        setCameras(Array.isArray(camerasData) ? camerasData : []);
      } catch (err: any) {
        console.error('خطأ في جلب الكاميرات:', err);
        setError('خطأ في جلب الكاميرات: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  return (
    <AppLayout
      title="إدارة الكاميرات"
      subtitle="استعراض سريع لحالة الكاميرات مع إمكانية تكبير البث"
    >
      <div className="cameras__wrapper">{content()}</div>
    </AppLayout>
  );
}

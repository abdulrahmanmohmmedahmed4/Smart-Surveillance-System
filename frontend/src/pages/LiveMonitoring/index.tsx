import { AppLayout } from '../../components/layout/AppLayout';
import './styles.css';

const mockCameras = Array.from({ length: 6 }).map((_, index) => ({
  id: index + 1,
  name: `الكاميرا رقم ${index + 1}`,
  location: index % 2 === 0 ? 'البوابة الرئيسية' : 'ممر الطابق الأول',
  status: index % 3 === 0 ? 'alert' : 'online',
}));

export function LiveMonitoringPage() {
  return (
    <AppLayout
      title="المراقبة الحية"
      subtitle="شبكة كاميرات تفاعلية مع تكبير سريع ومؤشرات حالة بصرية"
    >
      <div className="live-grid">
        <section className="live-grid__main glass-panel">
          <header className="live-grid__header">
            <div>
              <h2>شبكة البث المباشر</h2>
              <p>شبكة تجريبية Placeholder سيتم ربطها ببث حقيقي لاحقاً</p>
            </div>
            <div className="live-grid__layout-switch">
              <button className="live-grid__layout-btn live-grid__layout-btn--active">
                2 × 2
              </button>
              <button className="live-grid__layout-btn">3 × 3</button>
              <button className="live-grid__layout-btn">مخصص</button>
            </div>
          </header>

          <div className="live-grid__videos">
            {mockCameras.slice(0, 4).map((camera) => (
              <article key={camera.id} className="live-grid__video-card">
                <div className="live-grid__video-surface">
                  <div className="live-grid__video-overlay" />
                  <div className="live-grid__video-meta">
                    <span className="live-grid__video-name">{camera.name}</span>
                    <span className="live-grid__video-location">
                      {camera.location}
                    </span>
                  </div>
                  <div className="live-grid__video-actions">
                    <button className="live-grid__icon-btn" type="button">
                      ⛶
                    </button>
                    <button className="live-grid__icon-btn" type="button">
                      🔇
                    </button>
                    <button className="live-grid__icon-btn" type="button">
                      📸
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="live-grid__side glass-panel">
          <div className="live-grid__side-header">
            <h2>قائمة الكاميرات</h2>
            <p>اختيار سريع للكاميرات ومراقبة حالتها</p>
          </div>
          <div className="live-grid__camera-list">
            {mockCameras.map((camera) => (
              <button
                key={camera.id}
                type="button"
                className="live-grid__camera-item"
              >
                <div className="live-grid__camera-main">
                  <span className="live-grid__camera-name">{camera.name}</span>
                  <span className="live-grid__camera-location">
                    {camera.location}
                  </span>
                </div>
                <span
                  className={
                    camera.status === 'alert'
                      ? 'live-grid__camera-chip live-grid__camera-chip--alert'
                      : 'live-grid__camera-chip live-grid__camera-chip--online'
                  }
                >
                  {camera.status === 'alert' ? 'تنبيه' : 'نشطة'}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

export default LiveMonitoringPage;



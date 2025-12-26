import { AppLayout } from '../../components/layout/AppLayout';
import './styles.css';

const stats = [
  { label: 'إجمالي الكاميرات', value: '32', trend: '+4', tone: 'primary' },
  { label: 'تنبيهات اليوم', value: '128', trend: '+21', tone: 'accent' },
  { label: 'الأحداث الحرجة', value: '9', trend: '+2', tone: 'danger' },
  { label: 'استخدام النظام', value: '87%', trend: '+5%', tone: 'muted' },
];

export function DashboardPage() {
  return (
    <AppLayout
      title="لوحة التحكم"
      subtitle="نظرة عامة على حالة النظام، الكاميرات، والتنبيهات في الوقت الفعلي"
    >
      <div className="dashboard">
        <section className="dashboard__grid">
          <div className="dashboard__left glass-panel">
            <header className="dashboard__section-header">
              <div>
                <h2 className="dashboard__section-title">مؤشرات النظام الحية</h2>
                <p className="dashboard__section-subtitle">
                  بيانات تقريبية Placeholder سيتم ربطها بواجهة الـ API لاحقاً
                </p>
              </div>
              <div className="dashboard__badges">
                <span className="badge-pill badge-pill--online">
                  <span className="badge-dot" /> بث الكاميرات مستقر
                </span>
                <span className="badge-pill">
                  نطاق زمني: آخر 24 ساعة
                </span>
              </div>
            </header>

            <div className="dashboard__stats-grid">
              {stats.map((item) => (
                <article
                  key={item.label}
                  className={`dashboard__stat-card dashboard__stat-card--${item.tone}`}
                >
                  <div className="dashboard__stat-label">{item.label}</div>
                  <div className="dashboard__stat-main">
                    <span className="dashboard__stat-value">{item.value}</span>
                    <span className="dashboard__stat-trend">
                      {item.trend} مقارنة باليوم السابق
                    </span>
                  </div>
                  <div className="dashboard__stat-footer">
                    <span>تحديث تقريبي لواجهة المستخدم</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="dashboard__chart-placeholder">
              <div className="dashboard__chart-header">
                <h3>مخطط زمني لكثافة التنبيهات</h3>
                <p>سيتم ربط هذا القسم ببيانات حقيقية من الباك اند لاحقاً</p>
              </div>
              <div className="dashboard__chart-body">
                <div className="dashboard__chart-lines">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <span
                      key={index}
                      className="dashboard__chart-bar"
                      style={{ height: `${40 + index * 8}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="dashboard__right glass-panel">
            <div className="dashboard__right-header">
              <h2>أحدث التنبيهات</h2>
              <p>قائمة تجريبية سيتم استبدالها ببيانات حقيقية لاحقاً</p>
            </div>
            <div className="dashboard__alerts">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="dashboard__alert-item">
                  <div className="dashboard__alert-main">
                    <span className="dashboard__alert-label">
                      تنبيه أمني {index + 1}
                    </span>
                    <span className="dashboard__alert-meta">
                      الكاميرا رقم {index + 4} • منذ دقائق
                    </span>
                  </div>
                  <span className="dashboard__alert-badge">حرج</span>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}

export default DashboardPage;



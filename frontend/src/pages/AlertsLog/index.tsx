import { AppLayout } from '../../components/layout/AppLayout';
import './styles.css';

const mockAlerts = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  type: index % 3 === 0 ? 'دخول غير مصرّح' : 'حركة مشبوهة',
  level: index % 4 === 0 ? 'high' : index % 3 === 0 ? 'medium' : 'low',
  camera: `الكاميرا ${index + 3}`,
  time: `قبل ${index + 2} دقيقة`,
}));

export function AlertsLogPage() {
  return (
    <AppLayout
      title="سجل التنبيهات"
      subtitle="استعراض التنبيهات مع فلاتر مبسطة لفرز الأحداث الحرجة"
    >
      <div className="alerts">
        <section className="alerts__filters glass-panel">
          <div className="alerts__filters-row">
            <div className="alerts__filters-group">
              <label>نوع الحدث</label>
              <select>
                <option>الكل</option>
                <option>دخول غير مصرّح</option>
                <option>حركة مشبوهة</option>
              </select>
            </div>
            <div className="alerts__filters-group">
              <label>مستوى الخطورة</label>
              <select>
                <option>الكل</option>
                <option>منخفض</option>
                <option>متوسط</option>
                <option>عالٍ</option>
              </select>
            </div>
            <div className="alerts__filters-group">
              <label>النطاق الزمني</label>
              <select>
                <option>آخر ساعة</option>
                <option>اليوم</option>
                <option>آخر 7 أيام</option>
              </select>
            </div>
          </div>
        </section>

        <section className="alerts__grid">
          <div className="alerts__table glass-panel">
            <header className="alerts__table-header">
              <h2>قائمة التنبيهات</h2>
              <p>البيانات تجريبية وسيتم ربطها بقاعدة البيانات لاحقاً</p>
            </header>
            <div className="alerts__table-head">
              <span>نوع الحدث</span>
              <span>الكاميرا</span>
              <span>المستوى</span>
              <span>الوقت</span>
            </div>
            <div className="alerts__table-body">
              {mockAlerts.map((alert) => (
                <button
                  key={alert.id}
                  type="button"
                  className="alerts__row"
                >
                  <span className="alerts__cell-main">{alert.type}</span>
                  <span className="alerts__cell">{alert.camera}</span>
                  <span
                    className={`alerts__level alerts__level--${alert.level}`}
                  >
                    {alert.level === 'high'
                      ? 'عالٍ'
                      : alert.level === 'medium'
                      ? 'متوسط'
                      : 'منخفض'}
                  </span>
                  <span className="alerts__cell">{alert.time}</span>
                </button>
              ))}
            </div>
          </div>

          <aside className="alerts__side glass-panel">
            <h2>تفاصيل التنبيه</h2>
            <p className="alerts__side-hint">
              اختر أي صف من الجدول على اليسار ليتم عرض تفاصيله هنا. في الوقت
              الحالي هذا القسم تجريبي وسيتم ربطه ببيانات فعلية من الباك اند.
            </p>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}

export default AlertsLogPage;



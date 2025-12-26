import { AppLayout } from '../../components/layout/AppLayout';
import './styles.css';

const mockUsers = [
  {
    id: 1,
    name: 'أحمد علي',
    email: 'ahmad@example.com',
    role: 'مشرف',
    status: 'active',
    lastLogin: 'قبل 10 دقائق',
  },
  {
    id: 2,
    name: 'سارة محمد',
    email: 'sara@example.com',
    role: 'مراقب',
    status: 'active',
    lastLogin: 'قبل 30 دقيقة',
  },
  {
    id: 3,
    name: 'فهد العتيبي',
    email: 'fahad@example.com',
    role: 'مراجع',
    status: 'suspended',
    lastLogin: 'قبل يوم',
  },
];

export function UserManagementPage() {
  return (
    <AppLayout
      title="إدارة المستخدمين"
      subtitle="إدارة الوصول للأدوار المختلفة في نظام المراقبة"
    >
      <div className="users">
        <section className="users__grid">
          <div className="users__table glass-panel">
            <header className="users__header">
              <h2>قائمة المستخدمين</h2>
              <button type="button" className="users__primary-btn">
                + مستخدم جديد
              </button>
            </header>
            <div className="users__table-head">
              <span>الاسم</span>
              <span>البريد الإلكتروني</span>
              <span>الدور</span>
              <span>آخر تسجيل دخول</span>
              <span>الحالة</span>
            </div>
            <div className="users__table-body">
              {mockUsers.map((user) => (
                <button key={user.id} type="button" className="users__row">
                  <span className="users__cell-main">{user.name}</span>
                  <span className="users__cell">{user.email}</span>
                  <span className="users__cell">{user.role}</span>
                  <span className="users__cell">{user.lastLogin}</span>
                  <span
                    className={
                      user.status === 'active'
                        ? 'users__status users__status--active'
                        : 'users__status users__status--suspended'
                    }
                  >
                    {user.status === 'active' ? 'نشط' : 'معلق'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <aside className="users__side glass-panel">
            <h2>تفاصيل المستخدم / النموذج</h2>
            <p className="users__side-text">
              سيتم هنا لاحقاً عرض نموذج إضافة/تعديل مستخدم مع حقول الدور والصلاحيات
              وربطها مع الباك اند. في الوقت الحالي هذا القسم تجريبي لعرض شكل
              الواجهة فقط.
            </p>
          </aside>
        </section>
      </div>
    </AppLayout>
  );
}

export default UserManagementPage;



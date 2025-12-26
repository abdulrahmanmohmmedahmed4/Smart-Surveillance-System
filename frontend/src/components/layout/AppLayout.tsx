import { ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import { useAppConfig } from '../../config/appConfig';

type AppLayoutProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

type NavItem = {
  path: string;
  label: string;
  description?: string;
  icon: string;
};

const primaryNav: NavItem[] = [
  { path: '/dashboard', label: 'nav.dashboard', description: 'nav.dashboard.desc', icon: '📊' },
  { path: '/live', label: 'nav.live', description: 'nav.live.desc', icon: '🎥' },
  { path: '/cameras', label: 'nav.cameras', description: 'nav.cameras.desc', icon: '📡' },
  { path: '/alerts', label: 'nav.alerts', description: 'nav.alerts.desc', icon: '🚨' },
];

const secondaryNav: NavItem[] = [
  { path: '/wanted', label: 'nav.wanted', description: 'nav.wanted.desc', icon: '🧾' },
  { path: '/users', label: 'nav.users', description: 'nav.users.desc', icon: '👤' },
  { path: '/reports', label: 'nav.reports', description: 'nav.reports.desc', icon: '📑' },
  { path: '/settings', label: 'nav.settings', description: 'nav.settings.desc', icon: '⚙️' },
];

function AppSidebar() {
  const { t } = useAppConfig();
  const location = useLocation();

  const renderItem = (item: NavItem) => {
    const isActive = location.pathname.startsWith(item.path);
    const activeClass = isActive ? ' app-shell__nav-item--active' : '';

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={`app-shell__nav-item${activeClass}`}
      >
        <div className="app-shell__nav-item-main">
          <span className="app-shell__nav-icon">{item.icon}</span>
          <span className="app-shell__nav-label-text">
            <span className="app-shell__nav-title">{t(item.label as any)}</span>
            {item.description && (
              <span className="app-shell__nav-subtitle">
                {t(item.description as any)}
              </span>
            )}
          </span>
        </div>
        {isActive && <span className="app-shell__nav-pip" />}
      </NavLink>
    );
  };

  return (
    <aside className="app-shell__sidebar">
      <div className="app-shell__logo">
        <div className="app-shell__logo-mark">
          <div className="app-shell__logo-orbit">SS</div>
        </div>
        <div className="app-shell__logo-text">
          <div className="app-shell__logo-title">Smart Surveillance</div>
          <div className="app-shell__logo-subtitle">منصة مراقبة ذكية للأمن المتقدم</div>
        </div>
        <div className="app-shell__status">
          <div className="app-shell__status-pill">
            <span className="app-shell__status-dot" />
            Live
          </div>
          <span className="app-shell__status-caption">جميع الأنظمة تعمل</span>
        </div>
      </div>

      <nav className="app-shell__nav" aria-label="التنقل الرئيسي">
        <span className="app-shell__nav-label">
          {t('nav.section.monitoring')}
        </span>
        {primaryNav.map(renderItem)}

        <span className="app-shell__nav-label">
          {t('nav.section.management')}
        </span>
        {secondaryNav.map(renderItem)}
      </nav>

      <div className="app-shell__nav-footer">
        <div className="app-shell__nav-footline">
          <span>{t('nav.alertStatus')}</span>
          <span className="app-shell__nav-foot-accent">
            {t('nav.alertStatus.value')}
          </span>
        </div>
        <div className="app-shell__nav-footline">
          <span>{t('nav.version')}</span>
          <span className="app-shell__nav-foot-badge">v1.0 • Beta</span>
        </div>
      </div>
    </aside>
  );
}

function AppTopbar() {
  const navigate = useNavigate();
  const { t, language, theme, toggleLanguage, toggleTheme } = useAppConfig();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="app-shell__topbar">
      <div className="app-shell__search">
        <div className="app-shell__search-field">
          <span role="img" aria-label="بحث">
            🔍
          </span>
          <input
            className="app-shell__search-input"
            placeholder={t('topbar.search.placeholder')}
          />
          <span className="app-shell__search-kbd">Ctrl + K</span>
        </div>
      </div>

      <div className="app-shell__topbar-right">
        <button
          type="button"
          className="app-shell__icon-button"
          aria-label={t('topbar.theme')}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>

        <button
          type="button"
          className="app-shell__icon-button"
          aria-label={language === 'ar' ? 'English' : 'العربية'}
          onClick={toggleLanguage}
        >
          {language === 'ar' ? 'EN' : 'ع'}
        </button>

        <button
          type="button"
          className="app-shell__icon-button app-shell__icon-button--alert"
          aria-label="التنبيهات"
        >
          <span className="app-shell__icon-dot">🚨</span>
        </button>
        <button
          type="button"
          className="app-shell__icon-button"
          aria-label="وضع الإضاءة"
        >
          🌙
        </button>

        <div className="app-shell__user">
          <div className="app-shell__user-info">
            <span className="app-shell__user-name">
              {t('topbar.user.role')}
            </span>
            <span className="app-shell__user-role">
              {t('topbar.user.roleSubtitle')}
            </span>
          </div>
          <div className="app-shell__avatar">SA</div>
          <button
            type="button"
            onClick={handleLogout}
            className="app-shell__pill-button"
          >
            ⏻ خروج
          </button>
        </div>
      </div>
    </header>
  );
}

export function AppLayout({ title, subtitle, actions, children }: AppLayoutProps) {
  return (
    <div className="app-root">
      <div className="app-shell">
        <AppSidebar />
        <AppTopbar />
        <main className="app-shell__content">
          <section className="app-shell__content-inner fade-in-up">
            {(title || subtitle || actions) && (
              <header className="app-shell__page-header">
                <div>
                  {title && <h1 className="app-shell__page-title">{title}</h1>}
                  {subtitle && (
                    <p className="app-shell__page-subtitle">{subtitle}</p>
                  )}
                </div>
                {actions && (
                  <div className="app-shell__page-actions">{actions}</div>
                )}
              </header>
            )}
            <div className="app-shell__page-body">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}



import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type Language = 'ar' | 'en';
type ThemeMode = 'dark' | 'light';

type TranslationDict = Record<string, { ar: string; en: string }>;

const translations: TranslationDict = {
  // Sidebar
  'nav.dashboard': { ar: 'لوحة التحكم', en: 'Dashboard' },
  'nav.dashboard.desc': { ar: 'نظرة عامة حية', en: 'Live overview' },
  'nav.live': { ar: 'المراقبة الحية', en: 'Live Monitoring' },
  'nav.live.desc': { ar: 'شبكة الكاميرات', en: 'Camera grid' },
  'nav.cameras': { ar: 'إدارة الكاميرات', en: 'Cameras' },
  'nav.cameras.desc': { ar: 'التكوين والحالة', en: 'Config & health' },
  'nav.alerts': { ar: 'سجل التنبيهات', en: 'Alerts Log' },
  'nav.alerts.desc': { ar: 'الأحداث الحرجة', en: 'Critical events' },
  'nav.wanted': { ar: 'الأشخاص المطلوبين', en: 'Wanted persons' },
  'nav.wanted.desc': { ar: 'قائمة ومتابعة', en: 'List & follow-up' },
  'nav.users': { ar: 'المستخدمون والصلاحيات', en: 'Users & permissions' },
  'nav.users.desc': { ar: 'إدارة الوصول', en: 'Access control' },
  'nav.reports': { ar: 'التقارير', en: 'Reports' },
  'nav.reports.desc': { ar: 'تحليلات تاريخية', en: 'Historical analytics' },
  'nav.settings': { ar: 'إعدادات النظام', en: 'System settings' },
  'nav.settings.desc': { ar: 'ضبط المنصة', en: 'Platform config' },
  'nav.section.monitoring': { ar: 'المراقبة', en: 'Monitoring' },
  'nav.section.management': { ar: 'الإدارة والتحكم', en: 'Management' },
  'nav.alertStatus': { ar: 'حالة التنبيهات', en: 'Alert status' },
  'nav.alertStatus.value': { ar: 'مراقبة فورية', en: 'Real-time' },
  'nav.version': { ar: 'إصدار المنصة', en: 'Platform version' },

  // Topbar
  'topbar.search.placeholder': {
    ar: 'بحث في الكاميرات، التنبيهات، المستخدمين...',
    en: 'Search cameras, alerts, users...',
  },
  'topbar.theme': { ar: 'وضع الإضاءة', en: 'Theme' },
  'topbar.logout': { ar: 'خروج', en: 'Logout' },
  'topbar.user.role': { ar: 'مسؤول النظام', en: 'System Admin' },
  'topbar.user.roleSubtitle': { ar: 'Super Admin', en: 'Super Admin' },

  // Auth
  'auth.product': { ar: 'Smart Surveillance', en: 'Smart Surveillance' },
  'auth.title': {
    ar: 'تسجيل الدخول إلى لوحة المراقبة',
    en: 'Sign in to monitoring console',
  },
  'auth.subtitle': {
    ar: 'أدخل بياناتك للوصول إلى لوحة التحكم، سيتم لاحقاً ربط هذه الشاشة بآليات مصادقة متقدمة.',
    en: 'Enter your credentials to access the console. Advanced auth will be added later.',
  },
  'auth.username.label': { ar: 'اسم المستخدم', en: 'Username' },
  'auth.username.placeholder': { ar: 'مثال: superadmin', en: 'e.g. superadmin' },
  'auth.password.label': { ar: 'كلمة المرور', en: 'Password' },
  'auth.password.placeholder': { ar: '••••••••', en: '••••••••' },
  'auth.login.loading': { ar: 'جاري التحقق...', en: 'Signing in...' },
  'auth.login.submit': { ar: 'تسجيل الدخول', en: 'Sign in' },
  'auth.error': {
    ar: 'بيانات الدخول غير صحيحة أو الاتصال بالسيرفر غير متاح حالياً',
    en: 'Invalid credentials or server unavailable',
  },
};

type AppConfigContextValue = {
  language: Language;
  theme: ThemeMode;
  t: (key: keyof typeof translations) => string;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const AppConfigContext = createContext<AppConfigContextValue | undefined>(
  undefined,
);

const STORAGE_KEYS = {
  language: 'sss_language',
  theme: 'sss_theme',
} as const;

export function AppConfigProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Load from localStorage on mount
  useEffect(() => {
    const storedLang =
      (window.localStorage.getItem(STORAGE_KEYS.language) as Language | null) ??
      'ar';
    const storedTheme =
      (window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode | null) ??
      'dark';

    setLanguage(storedLang);
    setTheme(storedTheme);
  }, []);

  // Apply language (dir attribute)
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.body.setAttribute('dir', dir);
    window.localStorage.setItem(STORAGE_KEYS.language, language);
  }, [language]);

  // Apply theme (body class)
  useEffect(() => {
    document.body.classList.toggle('theme-light', theme === 'light');
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const value = useMemo<AppConfigContextValue>(
    () => ({
      language,
      theme,
      t: (key) => translations[key]?.[language] ?? key,
      toggleLanguage: () =>
        setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar')),
      toggleTheme: () =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [language, theme],
  );

  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  const ctx = useContext(AppConfigContext);
  if (!ctx) {
    throw new Error('useAppConfig must be used within AppConfigProvider');
  }
  return ctx;
}



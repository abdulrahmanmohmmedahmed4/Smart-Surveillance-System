import React, { useState } from 'react';
import { login } from '../services/authService';
import './Login/styles.css';
import { useAppConfig } from '../config/appConfig';

export default function LoginPage() {
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useAppConfig();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.access);
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error(err);
      setError(t('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-shell__orbital" />
      <div className="auth-shell__panel glass-panel fade-in-up">
        <header className="auth-shell__header">
          <div className="auth-shell__badge">{t('auth.product')}</div>
          <h1 className="auth-shell__title">{t('auth.title')}</h1>
          <p className="auth-shell__subtitle">{t('auth.subtitle')}</p>
        </header>

        <form className="auth-form" onSubmit={handleLogin}>
          <label className="auth-form__field">
            <span className="auth-form__label">
              {t('auth.username.label')}
            </span>
            <input
              className="auth-form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('auth.username.placeholder')}
              autoComplete="username"
            />
          </label>

          <label className="auth-form__field">
            <span className="auth-form__label">
              {t('auth.password.label')}
            </span>
            <input
              className="auth-form__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('auth.password.placeholder')}
              autoComplete="current-password"
            />
          </label>

          {error && <div className="auth-form__error">{error}</div>}

          <button
            type="submit"
            className="auth-form__submit"
            disabled={loading}
          >
            {loading ? t('auth.login.loading') : t('auth.login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

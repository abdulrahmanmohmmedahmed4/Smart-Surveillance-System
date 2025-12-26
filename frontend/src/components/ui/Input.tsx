import { InputHTMLAttributes } from 'react';
import '../../App.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = '', ...rest }: InputProps) {
  return (
    <label className="auth-form__field">
      {label && <span className="auth-form__label">{label}</span>}
      <input
        className={`auth-form__input ${className}`.trim()}
        {...rest}
      />
      {error && <div className="auth-form__error">{error}</div>}
    </label>
  );
}





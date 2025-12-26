import { ButtonHTMLAttributes, ReactNode } from 'react';
import '../../App.css';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === 'primary'
      ? 'app-shell__pill-button app-shell__pill-button--primary'
      : variant === 'outline'
      ? 'app-shell__pill-button'
      : variant === 'danger'
      ? 'app-shell__pill-button cameras__modal-close'
      : 'app-shell__pill-button';

  const sizeClass = size === 'sm' ? 'app-shell__pill-button--sm' : '';

  return (
    <button
      type="button"
      className={`${variantClass} ${sizeClass} ${className}`.trim()}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}



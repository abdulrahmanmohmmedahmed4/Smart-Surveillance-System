import { ReactNode } from 'react';
import '../../App.css';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = '' }: CardProps) {
  return <div className={`glass-panel ${className}`.trim()}>{children}</div>;
}



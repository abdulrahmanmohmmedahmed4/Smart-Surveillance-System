import { ReactNode } from 'react';
import '../../App.css';

type TableProps = {
  header: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Table({ header, children, className = '' }: TableProps) {
  return (
    <div className={`glass-panel ${className}`.trim()}>
      {header}
      <div>{children}</div>
    </div>
  );
}





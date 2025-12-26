import { ReactNode } from 'react';
import { AppLayout } from './AppLayout';

type LayoutProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function Layout(props: LayoutProps) {
  return <AppLayout {...props} />;
}





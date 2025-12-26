import { ReactNode } from 'react';
import '../../App.css';

type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div className="app-shell__page-actions">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`app-shell__pill-button ${
            tab.id === activeId ? 'app-shell__pill-button--primary' : ''
          }`.trim()}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}





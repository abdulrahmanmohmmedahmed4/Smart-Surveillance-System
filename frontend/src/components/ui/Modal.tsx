import { ReactNode } from 'react';
import '../../App.css';

type ModalProps = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="cameras__modal-backdrop" onClick={onClose}>
      <div
        className="cameras__modal glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cameras__modal-header">
          {title && <h2>{title}</h2>}
          <button
            type="button"
            className="cameras__modal-close"
            onClick={onClose}
          >
            إغلاق
          </button>
        </div>
        <div className="cameras__modal-body">{children}</div>
      </div>
    </div>
  );
}





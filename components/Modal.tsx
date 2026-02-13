import { ReactNode } from 'react';

type ModalProps = { title: string; open?: boolean; children?: ReactNode };

export function Modal({ title, open = true, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="modal">
      <h4>{title}</h4>
      {children}
    </div>
  );
}

import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
};

function Modal({ title, children, open, onClose, className = "" }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const modal = dialog.current;
    if (modal && open) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [open]);

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      <h2>{title}</h2>
      {children}
    </dialog>,
    document.getElementById("modal") as Element,
  );
}

export default Modal;

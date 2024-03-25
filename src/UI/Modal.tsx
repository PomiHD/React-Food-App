import { useEffect, useRef } from "react";

import { createPortal } from "react-dom";

function Modal({ title, children, open, onClose, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      // @ts-ignore
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog className={`modal ${className}`} ref={dialog} onClose={onClose}>
      <h2>{title}</h2>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}

export default Modal;

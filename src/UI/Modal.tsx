﻿import { forwardRef, useImperativeHandle, useRef } from "react";

export const Modal = forwardRef(function Modal({ title, modalActions }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      Cart
      <form method="dialog" id="modal-actions">
        {modalActions}
      </form>
    </dialog>
  );
});

export default Modal;

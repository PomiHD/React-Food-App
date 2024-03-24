import { forwardRef, useImperativeHandle, useRef } from "react";
import Cart from "../components/Cart.tsx";

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
    <dialog className="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {modalActions}
      </form>
    </dialog>
  );
});

export default Modal;

import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.tsx";
import { useContext, useRef } from "react";
import { CartContext } from "../store/CartContext.tsx";
import Modal from "../UI/Modal.tsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const modal = useRef();

  function handleOpenCartClick() {
    modal.current.open();
  }

  const modalActions =
    cartQuantity > 0 ? (
      <>
        <Button>Close</Button>
        <Button>Checkout</Button>
      </>
    ) : (
      <Button>Close</Button>
    );

  return (
    <>
      <Modal
        title={"Your Cart"}
        modalActions={modalActions}
        ref={modal}
      ></Modal>
      <header id={"main-header"}>
        <div id={"title"}>
          <img src={logoImg} alt={"logo"} />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}

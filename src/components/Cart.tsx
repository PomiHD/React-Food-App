import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";
import { currencyFormatter } from "../util/formatting.ts";
import Modal from "../UI/Modal.tsx";
import Button from "../UI/Button.tsx";
import { UserProgressContext } from "../store/UserProgressContext.tsx";

export default function Cart() {
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);
  const { items, removeItemQuantity, addItemToCart } = useContext(CartContext);
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const modalActions =
    cartQuantity > 0 ? (
      <>
        <Button textOnly onClick={hideCart}>
          Close
        </Button>
        <Button onClick={showCheckout}>Checkout</Button>
      </>
    ) : (
      <Button textOnly onClick={hideCart}>
        Close
      </Button>
    );
  return (
    <Modal
      className={"cart"}
      title={"Your Cart"}
      open={progress === "cart"}
      onClose={progress === "cart" ? hideCart : null}
    >
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id} className={"cart-item"}>
                <p>
                  {item.name} - {item.quantity} x{" "}
                  {currencyFormatter.format(item.price)}
                </p>
                <p className={"cart-item-actions"}>
                  <button onClick={() => removeItemQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addItemToCart(item)}>+</button>
                </p>
              </li>
            );
          })}
        </ul>
      )}
      <p className={"cart-total"}>
        Cart Total: <strong>{currencyFormatter.format(totalPrice)}</strong>
      </p>
      <p className={"modal-actions"}>{modalActions}</p>
    </Modal>
  );
}

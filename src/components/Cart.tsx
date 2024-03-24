import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";
import { currencyFormatter } from "../util/formatting.ts";

export default function Cart() {
  const { items, removeItemQuantity, addItemToCart } = useContext(CartContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  return (
    <div className={"cart"}>
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
    </div>
  );
}

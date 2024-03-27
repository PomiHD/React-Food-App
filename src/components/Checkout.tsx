import Modal from "../UI/Modal.tsx";
import { useContext } from "react";
import Button from "../UI/Button.tsx";
import { CartContext } from "../store/CartContext.tsx";
import { UserProgressContext } from "../store/UserProgressContext.tsx";
import { currencyFormatter } from "../util/formatting.ts";
import Input from "../UI/Input.tsx";
import { Error } from "./Error.tsx";
import useHttp from "../hooks/useHttp.tsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const url = "http://localhost:5013/api/Orders";
export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(url, requestConfig);
  function handelFinish() {
    clearData();
    clearCart();
    hideCheckout();
  }

  function handelSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        items: items,
        customer: customerData,
      }),
    );
  }

  const modalActions = isSending ? (
    <span>
      <p>Sending order data...</p>
    </span>
  ) : (
    <>
      {/*// the button in <form /> should have type={"reset"}, or it will submit the form when clicked which is not the desired behavior*/}
      <Button textOnly type={"reset"} onClick={hideCheckout}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (data && !error) {
    return (
      <Modal
        title={"Success"}
        open={progress === "checkout"}
        onClose={handelFinish}
      >
        <p>Order placed successfully!</p>
        <p>
          We will deliver your order to the provided address as soon as
          possible.
        </p>
        <Button className={"modal-actions"} onClick={handelFinish}>
          Okay
        </Button>
      </Modal>
    );
  }

  return (
    <Modal
      title={"Your details"}
      open={progress === "checkout"}
      onClose={hideCheckout}
    >
      <form onSubmit={handelSubmit}>
        <p>
          Total Amount: <strong>{currencyFormatter.format(totalPrice)}</strong>
        </p>
        <Input label={"Full Name"} type={"text"} id={"name"} />
        <Input label={"Email Address"} type={"email"} id={"email"} />
        <Input label={"Street"} type={"text"} id={"street"} />
        <div className={"control-row"}>
          <Input label={"postalCode"} type={"text"} id={"postalCode"} />
          <Input label={"City"} type={"text"} id={"city"} />
        </div>
        {error && <Error title={"Failed to submit order!"} message={error} />}
        <div className={"modal-actions"}>{modalActions}</div>
      </form>
    </Modal>
  );
}

import Modal from "../UI/Modal.tsx";
import { FormEvent } from "react";
import Button from "../UI/Button.tsx";
import { useCartContext } from "../store/CartContext.tsx";
import { useUserProgressContext } from "../store/UserProgressContext.tsx";
import { currencyFormatter } from "../util/formatting.ts";
import Input from "../UI/Input.tsx";
import useHttp from "../hooks/useHttp.tsx";
import { ErrorMessage } from "./ErrorMessage.tsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const url = "http://localhost:5013/api/Orders";
export default function Checkout() {
  const { items, clearCart } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0,
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
    clearError,
  } = useHttp(url, requestConfig);
  function handelFinish() {
    clearData();
    clearCart();
    hideCheckout();
  }

  function handelClose() {
    clearError();
    hideCheckout();
  }

  function handelSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        items: items,
        customer: customerData,
      }),
    )
      .then(() => {
        console.log("Request sent successfully");
      })
      .catch((error) => {
        console.error("Failed to send request:", error);
      });
  }

  const modalActions = isSending ? (
    <span>
      <p>Sending order data...</p>
    </span>
  ) : (
    <>
      {/*// the button in <form /> should have type={"reset"}, or it will submit the form when clicked which is not the desired behavior*/}
      <Button textOnly type={"reset"} onClick={handelClose}>
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
        {error && (
          <ErrorMessage title={"Failed to submit order!"} message={error} />
        )}
        <div className={"modal-actions"}>{modalActions}</div>
      </form>
    </Modal>
  );
}

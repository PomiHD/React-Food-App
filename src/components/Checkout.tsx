import Modal from "../UI/Modal.tsx";
import { useContext, useRef, useState } from "react";
import Button from "../UI/Button.tsx";
import { CartContext } from "../store/CartContext.tsx";
import { UserProgressContext } from "../store/UserProgressContext.tsx";
import { placeOrder } from "../htpp.ts";
import { currencyFormatter } from "../util/formatting.ts";
import Input from "../UI/Input.tsx";
import { Error } from "./Error.tsx";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, showCart, hideCheckout } = useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const nameRef = useRef("");
  const emailRef = useRef("");
  const streetRef = useRef("");
  const postcodeRef = useRef("");
  const cityRef = useRef("");

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [errorUpdatingOrder, setErrorUpdatingOrder] = useState(false);
  async function handelPlaceOrder(items, customerData) {
    try {
      await placeOrder(items, customerData);
    } catch (error) {
      console.log(error.message);
      setErrorUpdatingOrder({
        message:
          error.message || "Failed to place order. Please try again later.",
      });
    }
  }
  function handelSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    // validate email address
    const emailIsValid = customerData.email.includes("@");
    if (!emailIsValid) {
      setEmailIsInvalid(true);
      setErrorUpdatingOrder({
        message: "Please enter a valid email address.",
      });
      return (
        <Error
          message={"Please enter a valid email address."}
          title={"Invalid Email Address"}
        />
      );
    }

    handelPlaceOrder(items, customerData);
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
        <Input label={"Full Name"} type={"text"} id={"name"} ref={nameRef} />
        <Input
          label={"Email Address"}
          type={"email"}
          id={"email"}
          ref={emailRef}
        />
        <Input label={"Street"} type={"text"} id={"street"} ref={streetRef} />
        <div className={"control-row"}>
          <Input
            label={"Postal Code"}
            type={"text"}
            id={"postal-code"}
            ref={postcodeRef}
          />
          <Input label={"City"} type={"text"} id={"city"} ref={cityRef} />
        </div>

        <p className={"modal-actions"}>
          <Button textOnly onClick={showCart}>
            Back
          </Button>
          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

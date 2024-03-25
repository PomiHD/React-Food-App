import Modal from "../UI/Modal.tsx";
import { useContext, useRef, useState } from "react";
import Button from "../UI/Button.tsx";
import { CartContext } from "../store/CartContext.tsx";
import { UserProgressContext } from "../store/UserProgressContext.tsx";
import { placeOrder } from "../htpp.ts";
import { currencyFormatter } from "../util/formatting.ts";
import Input from "../UI/Input.tsx";

export default function Checkout() {
  const { items } = useContext(CartContext);
  const { progress, showCart, hideCheckout } = useContext(UserProgressContext);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const postcodeRef = useRef();
  const cityRef = useRef();

  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [errorUpdatingOrder, setErrorUpdatingOrder] = useState(false);
  async function handelPlaceOrder(orderData) {
    try {
      await placeOrder(orderData);
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
    const enteredEmail = emailRef.current.value;
    const emailIsValid = enteredEmail.includes("@");
    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredPostcode = postcodeRef.current.value;
    const enteredCity = cityRef.current.value;
    const orderData = {
      customer: {
        name: enteredName,
        email: enteredEmail,
        address: enteredAddress,
        postcode: enteredPostcode,
        city: enteredCity,
      },
      items: items.map((item) => ({
        id: item.id,
        price: currencyFormatter.format(item.price),
        quantity: item.quantity,
      })),
    };
    const order = {
      ...orderData,
      totalPrice: currencyFormatter.format(totalPrice),
    };

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      setErrorUpdatingOrder({
        message: "Please enter a valid email",
      });
      console.log("stop sending http request...");
      // return to stop the function execution
      return;
    }

    if (
      !enteredEmail ||
      !enteredName ||
      !enteredAddress ||
      !enteredPostcode ||
      !enteredCity
    ) {
      setErrorUpdatingOrder({
        message:
          "Missing data: Email, name, street, postal code or city is missing.",
      });
      console.log(
        "Missing data: Email, name, street, postal code or city is missing.",
      );
      return;
    }
    setEmailIsInvalid(false);
    handelPlaceOrder(order);
    console.log("sending http request...");
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
        <Input label={"Full Name"} type={"text"} id={"full-name"} />
        <Input label={"Email Address"} type={"email"} id={"email"} />
        <Input label={"Street"} type={"text"} id={"street"} />
        <div className={"control-row"}>
          <Input label={"Postal Code"} type={"text"} id={"postal-code"} />
          <Input label={"City"} type={"text"} id={"city"} />
        </div>

        <p className={"modal-actions"}>
          <Button textOnly onClick={showCart}>
            Back
          </Button>
          <Button type="submit" onClick={hideCheckout}>
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}

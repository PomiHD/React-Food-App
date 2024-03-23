import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.tsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <header id={"main-header"}>
        <div id={"title"}>
          <img src={logoImg} alt={"logo"} />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly>Cart ({cartQuantity})</Button>
        </nav>
      </header>
    </>
  );
}

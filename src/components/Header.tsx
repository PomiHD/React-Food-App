import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.tsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";

export default function Header() {
  const { items } = useContext(CartContext);
  return (
    <>
      <header id={"main-header"}>
        <div id={"title"}>
          <img src={logoImg} alt={"logo"} />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly>Cart ({items.length})</Button>
        </nav>
      </header>
    </>
  );
}

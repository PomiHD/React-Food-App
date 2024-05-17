import logoImg from "../assets/logo.jpg";
import Button from "../UI/Button.tsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";
import { UserProgressContext } from "../store/UserProgressContext.tsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const { showCart } = useContext(UserProgressContext);

  return (
    <>
      <header id={"main-header"}>
        <div id={"title"}>
          <img src={logoImg} alt={"logo"} />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button textOnly onClick={showCart}>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}

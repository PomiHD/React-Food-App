import Header from "./components/Header.tsx";
import AvailableMeals from "./components/AvailableMeals.tsx";
import CartContextProvider from "./store/CartContext.tsx";
import UserProgressContextProvider from "./store/UserProgressContext.tsx";
import Cart from "./components/Cart.tsx";
import Checkout from "./components/Checkout.tsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <AvailableMeals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;

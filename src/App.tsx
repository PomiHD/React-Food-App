import Header from "./components/Header.tsx";
import AvailableMeals from "./components/AvailableMeals.tsx";
import CartContextProvider from "./store/CartContext.tsx";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <AvailableMeals />
    </CartContextProvider>
  );
}

export default App;

import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
const CartReducer = (state, action) => {
  // ... update state to add meal item
  if (action.type === "ADD_ITEM") {
  }

  // ... update state to update meal item quantity
  if (action.type === "UPDATE_ITEM") {
  }

  return state;
};

function CartProvider({ children }) {
  useReducer(CartReducer, { items: [] });

  function addItemToCart() {}

  function updateItemQuantity() {}

  const context = {
    items: [],
    addItemToCart: addItemToCart,
    updateItemQuantity: updateItemQuantity,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

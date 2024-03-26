import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (meal) => {},
  removeItemQuantity: (id) => {},
  clearCart: () => {},
});
const CartReducer = (state, action) => {
  // ... update state to add meal item
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id == action.item.id,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }
    return { ...state, items: updatedItems };
  }
  // ... update state to update meal item quantity
  if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...state.items];
    // console.log(updatedItems);
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id == action.id,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  // ... update state to clear cart
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }
  return state;
};

function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(CartReducer, {
    items: [],
  });

  function addItemToCart(item: any) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItemQuantity(id: string) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const context = {
    items: cartState.items,
    addItemToCart,
    removeItemQuantity,
    clearCart,
  };
  // console.log(context);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;

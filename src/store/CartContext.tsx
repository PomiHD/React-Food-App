import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});
const CartReducer = (state, action) => {
  // ... update state to add meal item
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id == action.payload,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem) {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      updatedItems.push({
        ...state.items,
        quantity: 1,
      });
    }
    return { ...state, items: updatedItems };
  }

  // ... update state to update meal item quantity
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id == action.payload.mealItemId,
    );
    //...TBC
  }

  return state;
};
function CartProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(CartReducer, { items: [] });

  function handelAddItemToCart(id: string) {
    cartDispatch({ type: "ADD_ITEM", payload: id });
  }
  function handelUpdateItemQuantity(id: string, amount: number) {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { mealItemId: id, amount: amount },
    });
  }

  const context = {
    items: cartState.items,
    addItemToCart: handelAddItemToCart,
    updateItemQuantity: handelUpdateItemQuantity,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
export default CartProvider;

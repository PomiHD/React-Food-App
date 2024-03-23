import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: (meal) => {},
  removeItemQuantity: (id) => {},
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
    console.log(updatedItems);
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

  const context = {
    items: cartState.items,
    addItemToCart,
    removeItemQuantity,
  };
  console.log(context);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;

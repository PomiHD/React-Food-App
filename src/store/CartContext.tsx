import { createContext, ReactNode, useReducer } from "react";
type CartItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
};
type CartsState = {
  items: CartItem[];
};
type CartContextValue = CartsState & {
  addItemToCart: (meal: CartItem) => void;
  removeItemQuantity: (id: string) => void;
  clearCart: () => void;
};

type AddItemAction = {
  type: "ADD_ITEM";
  item: CartItem;
};
type RemoveItemAction = {
  type: "REMOVE_ITEM";
  id: string;
};
type ClearCartAction = {
  type: "CLEAR_CART";
};
type Action = AddItemAction | RemoveItemAction | ClearCartAction;

export const CartContext = createContext<CartContextValue | null>(null);
const CartReducer = (state: CartsState, action: Action) => {
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
        quantity: existingCartItem.quantity! + 1,
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
        quantity: existingCartItem.quantity! - 1,
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

type CartContextProviderProps = {
  children: ReactNode;
};

function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatchCartAction] = useReducer(CartReducer, {
    items: [],
  });

  const context: CartContextValue = {
    items: cartState.items,
    addItemToCart(item: CartItem) {
      dispatchCartAction({ type: "ADD_ITEM", item });
    },
    removeItemQuantity(id: string) {
      dispatchCartAction({
        type: "REMOVE_ITEM",
        id: id,
      });
    },
    clearCart() {
      dispatchCartAction({ type: "CLEAR_CART" });
    },
  };
  // console.log(context);

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}

export default CartContextProvider;

import { createContext, ReactNode, useState } from "react";

type Progress = {
  progress: "" | "cart" | "checkout";
};

type UserProgressContextValue = Progress & {
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};
export const UserProgressContext = createContext<UserProgressContextValue>({
  progress: "", //cart,checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

type UserProgressContextProviderProps = {
  children: ReactNode;
};

export default function UserProgressContextProvider({
  children,
}: UserProgressContextProviderProps) {
  const [progress, setProgress] = useState<Progress["progress"]>("");

  function showCart() {
    setProgress("cart");
  }

  function hideCart() {
    setProgress("");
  }

  function showCheckout() {
    setProgress("checkout");
  }

  function hideCheckout() {
    setProgress("");
  }

  const userProgressCtx: UserProgressContextValue = {
    progress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

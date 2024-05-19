import { createContext, ReactNode, useContext, useState } from "react";

type Progress = {
  progress: "" | "cart" | "checkout";
};

type UserProgressContextValue = Progress & {
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

const UserProgressContext = createContext<UserProgressContextValue>({
  progress: "", //cart,checkout
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export function useUserProgressContext() {
  const userProgressCtx = useContext(UserProgressContext);
  if (userProgressCtx === null) {
    throw new Error(
      "UserProgressContext is null - that should not be the case!",
    );
  }
  return userProgressCtx;
}

type UserProgressContextProviderProps = {
  children: ReactNode;
};

function UserProgressContextProvider({
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

export default UserProgressContextProvider;

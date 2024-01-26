import React, { createContext, useReducer } from "react";
import { cartItemsReducer } from "../reducers/cartItemsReducer";

export const cartItemsContext = createContext();

const CartItemsContextProvider = (props) => {
  const [cartItems, dispatch] = useReducer(cartItemsReducer, []);

  return (
    <cartItemsContext.Provider value={{ cartItems, dispatch }}>
      {props.children}
    </cartItemsContext.Provider>
  );
};

export default CartItemsContextProvider;

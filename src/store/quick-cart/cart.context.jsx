import React, { useCallback } from "react";
import { cartReducer, initialState } from "./cart.reducer";
import { getItem, inStock } from "./cart.utils";
import useLocalStorage from "react-use/lib/useLocalStorage";
import { CART_KEY } from "../../lib/constants/index";
import { useAtom } from "jotai";
import { verifiedResponseAtom } from "../checkout";
// import { verifiedResponseAtom } from "@/store/checkout";

export const cartContext = React.createContext(undefined);

cartContext.displayName = "CartContext";

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return React.useMemo(() => context, [context]);
};

export const CartProvider = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    savedCart ? JSON.parse(savedCart) : initialState
  );
  const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
  React.useEffect(() => {
    emptyVerifiedResponse(null);
  }, [emptyVerifiedResponse, state]);

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemsToCart = (items) =>
    dispatch({ type: "ADD_ITEMS_WITH_QUANTITY", items });
  const addItemToCart = (item, quantity) =>
    dispatch({ type: "ADD_ITEM_WITH_QUANTITY", item, quantity });
  const removeItemFromCart = (id) =>
    dispatch({ type: "REMOVE_ITEM_OR_QUANTITY", id });
  const clearItemFromCart = (id) => dispatch({ type: "REMOVE_ITEM", id });
  const isInCart = useCallback(
    (id) => !!getItem(state.items, id),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (id) => getItem(state.items, id),
    [state.items]
  );
  const isInStock = useCallback(
    (id) => inStock(state.items, id),
    [state.items]
  );
  const updateCartLanguage = (language) =>
    dispatch({ type: "UPDATE_CART_LANGUAGE", language });
  const resetCart = () => dispatch({ type: "RESET_CART" });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemsToCart,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
      updateCartLanguage,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};

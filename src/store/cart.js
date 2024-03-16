import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create(
  devtools((set, get) => ({
    carts: [],
    // totalUniqueItems: () => {
    //   const totalCarts = get().carts;
    //   console.log("💯 ~ devtools ~ totalCarts:", totalCarts);
    //   return totalCarts;
    // },
    addItemToCart: (item, quantity) =>
      set((state) => ({
        carts: addItemWithQuantity(state.carts, item, quantity),
      })),
    removeItemFromCart: (_id) =>
      set((state) => ({
        carts: removeItemOrQuantity(state.carts, _id, 1),
      })),
    clearCart: (_id) =>
      set(() => ({
        carts: [],
      })),
  }))
);

// Utils

export function addItemWithQuantity(items, item, quantity) {
  if (quantity <= 0)
    throw new Error("cartQuantity can't be zero or less than zero");
  const existingItemIndex = items.findIndex(
    (existingItem) => existingItem._id === item._id
  );

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity += quantity;
    return newItems;
  }
  return [...items, { ...item, quantity }];
}

export function removeItemOrQuantity(items, _id, quantity) {
  return items.reduce((acc, item) => {
    if (item._id === _id) {
      const newQuantity = item.quantity - quantity;

      return newQuantity > 0
        ? [...acc, { ...item, quantity: newQuantity }]
        : [...acc];
    }
    return [...acc, item];
  }, []);
}

export function getItem(items, _id) {
  return items.find((item) => item._id === _id);
}

export const getItemFromCart = (items, _id) => getItem(items, _id);

export const isInCart = (items, _id) => !!getItem(items, _id);

export const calculateUniqueItems = (items) => items.length;

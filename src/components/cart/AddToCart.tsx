import React from "react";
import AddToCartBtn from "./AddToCartBtn";
import Counter from "./Counter";
import { isInCart, useCartStore, getItemFromCart } from "../../store/cart";

interface Props {
  item: any;
}

const AddToCart = ({ item }: Props) => {
  const carts = useCartStore((state) => state.carts);
  const addItemToCart = useCartStore((state) => state.addItemToCart);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);

  const handleAddClick = () => {
    addItemToCart(item, 1);
    if (!isInCart(carts, item._id)) {
    }
  };
  const handleRemoveClick = () => {
    removeItemFromCart(item._id);
  };
  const outOfStock = false;

  return !isInCart(carts, item?._id) ? (
    <AddToCartBtn onClick={handleAddClick} />
  ) : (
    <Counter
      value={getItemFromCart(carts, item._id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
    />
  );
};

export default AddToCart;

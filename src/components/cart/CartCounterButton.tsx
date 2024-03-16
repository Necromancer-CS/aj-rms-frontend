import React from "react";
import { useCartStore } from "../../store/cart";

const CartCounterButton = () => {
  const totalUniqueItems = useCartStore((state) => state.carts.length);

  return (
    <button>
      <span className="flex pb-0.5">
        {/* <CartCheckBagIcon className="shrink-0" width={14} height={16} /> */}
        <span className="flex ltr:ml-2 rtl:mr-2">{totalUniqueItems}</span>
      </span>
      <span className="w-full px-2 py-2 mt-3 rounded bg-light text-accent">
        {"totalPrice"}
      </span>
    </button>
  );
};

export default CartCounterButton;

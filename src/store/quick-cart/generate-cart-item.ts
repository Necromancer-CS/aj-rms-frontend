interface Item {
  _id: string | number;
  menuName: string;
  menuDetail: string;
  menuPrice: string | number;
  menuType: string;
  file: string;
  quantity?: number;
}
interface Variation {
  _id: string | number;
  menuName: string;
  menuDetail: string;
  menuPrice: string | number;
  menuType: string;
  file: string;
  quantity?: number;
}
export function generateCartItem(item: Item) {
  const { _id, menuName, menuDetail, menuPrice, menuType, file, quantity } =
    item;

  return {
    _id,
    menuName,
    menuDetail,
    menuPrice,
    menuType,
    file,
    quantity,
  };
}

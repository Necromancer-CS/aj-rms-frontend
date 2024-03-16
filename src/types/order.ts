export type OrderStatus = "notServed" | "served";
export interface OrderItem {
  _id: string;
  menuId: string;
  menuName: string;
  price: number;
  quantity: number;
  deskNo: string;
  customerBookingId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PayloadCreateCustomerMenu {
  menuId: string;
  price: number;
  quantity: number;
  deskNo: string;
  customerBookingId: string;
}

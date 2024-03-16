import axios from "axios";
import { OrderItem, PayloadCreateCustomerMenu } from "src/types/order";

//การแสดงข้อมูล
export const listByStatusOrderMenu = async () => {
  return await axios.get<OrderItem[]>(import.meta.env.VITE_API + "/order-menu");
};

//การสร้าง
export const createCustomerMenu = async (data: PayloadCreateCustomerMenu[]) => {
  return await axios.post(import.meta.env.VITE_API + "/order-menu", data);
};

//การแก้ไขข้อมูล
export const updateStatusOrderMenu = async (id: string, data: any) => {
  return await axios.put(import.meta.env.VITE_API + "/order-menu/" + id, data);
};

//การแสดงข้อมูล Order สำหรับลูกค้า
export const getOrderByCustomerBookingId = async (
  customerBookingId: string
) => {
  return await axios.get<OrderItem[]>(
    import.meta.env.VITE_API + "/order-customer/" + customerBookingId
  );
};

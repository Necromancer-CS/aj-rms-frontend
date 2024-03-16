import axios from "axios";
import { CustomerBookingItem, CustomerBookingPayload } from "src/types/booking";
//การแสดงข้อมูล
export const createCustomerBooking = async (data: CustomerBookingPayload) => {
  return await axios.post(import.meta.env.VITE_API + "/customer-booking", data);
};

//การแสดงข้อมูลและระบุ ID
export const getCustomerBookingById = async (id: string) => {
  return await axios.get<CustomerBookingItem>(
    import.meta.env.VITE_API + "/customer-booking/" + id
  );
};

//การแก้ไขข้อมูล เมื่อลูกค้ากดชำระเงิน
export const updateOrderBill = async (customerBookingId: string) => {
  return await axios.put(
    import.meta.env.VITE_API + "/customer-booking/" + customerBookingId
  );
};

// //การสร้าง
// export const create = async (data) => {
//   return await axios.post(import.meta.env.VITE_API + "/table", data);
// };

// //การแก้ไขข้อมูล
// export const update = async (id, data) => {
//   return await axios.put(import.meta.env.VITE_API + "/table/" + id, data);
// };

// //การลบ
// export const remove = async (id) => {
//   return await axios.delete(import.meta.env.VITE_API + "/table/" + id);
// };

// //การแก้ไข Status
// export const updateStatus = async (id) => {
//   return await axios.put(import.meta.env.VITE_API + "/tableStatue/" + id);
// };

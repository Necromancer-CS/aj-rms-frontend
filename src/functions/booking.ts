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

export const updatePayment = async (id: string, data: any) => {
  return await axios.put(import.meta.env.VITE_API + "/payment/" + id, data);
};

//การแก้ไขข้อมูล
export const updateCheckPayment = async (id: string, data: any) => {
  return await axios.put(import.meta.env.VITE_API + "/check-payment/" + id, data);
};

//การแสดงข้อมูลและระบุ ID
export const getQrCodeById = async (id: string) => {
  return await axios.get<CustomerBookingItem>(
    import.meta.env.VITE_API + "/qr-code/" + id
  );
};


// //การสร้าง
// export const create = async (data) => {
//   return await axios.post(import.meta.env.VITE_API + "/table", data);
// };

// //การลบ
// export const remove = async (id) => {
//   return await axios.delete(import.meta.env.VITE_API + "/table/" + id);
// };

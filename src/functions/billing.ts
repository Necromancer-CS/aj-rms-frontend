import axios from "axios";
import { BillingPayload } from "src/types/billing";

//การแสดงข้อมูล

//การแก้ไขข้อมูล เมื่อลูกค้ากดชำระเงิน
export const updateBilling = async (
  customerBookingId: string,
  payload: BillingPayload
) => {
  return await axios.put(
    import.meta.env.VITE_API + "/billing/" + customerBookingId,
    { ...payload }
  );
};

//การแสดงข้อมูลและระบุ ID
export const readBilling = async (id: string) => {
  return await axios.get(
    import.meta.env.VITE_API + "/billing/" + id
  );
};

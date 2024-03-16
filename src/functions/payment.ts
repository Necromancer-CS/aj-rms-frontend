import axios from "axios";
//การแสดงข้อมูล
export const getPaymentList = async () => {
  return await axios.get(import.meta.env.VITE_API + "/channel-payment");
};

//การแสดงข้อมูลและระบุ ID
export const read = async (id: string) => {
  return await axios.get(import.meta.env.VITE_API + "/channel-payment/" + id);
};

//การสร้าง
export const create = async (data: {}) => {
  return await axios.post(import.meta.env.VITE_API + "/channel-payment", data);
};

//การแก้ไขข้อมูล
export const update = async (id: string, data: any) => {
  return await axios.put(
    import.meta.env.VITE_API + "/channel-payment/" + id,
    data
  );
};

//การลบ
export const remove = async (id: string) => {
  return await axios.delete(
    import.meta.env.VITE_API + "/channel-payment/" + id
  );
};

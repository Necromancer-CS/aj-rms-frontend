import axios from "axios";
import { TMenuItem } from "src/types/menu";
//การแสดงข้อมูล
export const list = async () => {
  return await axios.get(import.meta.env.VITE_API + "/menu-control");
};

//การแสดงข้อมูลและระบุ ID
export const read = async (id: string) => {
  return await axios.get<TMenuItem>(
    import.meta.env.VITE_API + "/menu-control/" + id
  );
};

//การสร้าง
export const create = async (data: any) => {
  return await axios.post(import.meta.env.VITE_API + "/menu-control", data);
};

//การแก้ไขข้อมูล
export const update = async (id: string, data: any) => {
  return await axios.put(
    import.meta.env.VITE_API + "/menu-control/" + id,
    data
  );
};

//การลบ
export const remove = async (id: string) => {
  return await axios.delete<TMenuItem>(
    import.meta.env.VITE_API + "/menu-control/" + id
  );
};

// เมนูสำหรับการสั่งอาหาร
//การแสดงข้อมูล
export const listMenuByCustomerId = async (customerId: string) => {
  return await axios.get(import.meta.env.VITE_API + "/menu/" + customerId);
};

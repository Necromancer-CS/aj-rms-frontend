import axios from "axios";
//การแสดงข้อมูล
export const list = async () => {
  return await axios.get(import.meta.env.VITE_API + "/menu-control");
};

//การแสดงข้อมูลและระบุ ID
export const read = async (id) => {
  return await axios.get(import.meta.env.VITE_API + "/menu-control/" + id);
};

//การสร้าง
export const create = async (data) => {
  return await axios.post(import.meta.env.VITE_API + "/menu-control", data);
};

//การแก้ไขข้อมูล
export const update = async (id, data) => {
  return await axios.put(
    import.meta.env.VITE_API + "/menu-control/" + id,
    data
  );
};

//การลบ
export const remove = async (id) => {
  return await axios.delete(import.meta.env.VITE_API + "/menu-control/" + id);
};

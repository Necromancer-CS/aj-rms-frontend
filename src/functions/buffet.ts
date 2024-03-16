import axios from "axios";
//การแสดงข้อมูล
export const getBuffetList = async () => {
  return await axios.get(import.meta.env.VITE_API + "/buffet");
};

//การแสดงข้อมูลและระบุ ID
export const read = async (id: string) => {
  return await axios.get(import.meta.env.VITE_API + "/buffet/" + id);
};

//การสร้าง
export const create = async (data: {}) => {
  return await axios.post(import.meta.env.VITE_API + "/buffet", data);
};

//การแก้ไขข้อมูล
export const update = async (id: string, data: any) => {
  return await axios.put(import.meta.env.VITE_API + "/buffet/" + id, data);
};

//การลบ
export const remove = async (id: string) => {
  return await axios.delete(import.meta.env.VITE_API + "/buffet/" + id);
};

// //การแก้ไข Status
// export const updateStatus = async (id) => {
//   return await axios.put(import.meta.env.VITE_API + "/tableStatue/" + id);
// };

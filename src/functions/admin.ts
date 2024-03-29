import axios from "axios";

//การสร้าง Register
export const login = async (dataLogin: any) => {
    return await axios.post(import.meta.env.VITE_API + "/login", dataLogin);
};

//การสร้าง Register
export const register = async (dataRegister: any) => {
    return await axios.post(import.meta.env.VITE_API + "/admin", dataRegister);
};

//การแสดงข้อมูล
export const list = async () => {
    return await axios.get(import.meta.env.VITE_API + "/admin");
};

//การแสดงข้อมูลและระบุ ID
export const read = async (id: string) => {
    return await axios.get(import.meta.env.VITE_API + "/admin/" + id);
};

//การแก้ไขข้อมูล
export const update = async (id: string, data: any) => {
    return await axios.put(import.meta.env.VITE_API + "/admin/" + id, data);
};

//การลบ
export const remove = async (id: string) => {
    return await axios.delete(import.meta.env.VITE_API + "/admin/" + id);
};

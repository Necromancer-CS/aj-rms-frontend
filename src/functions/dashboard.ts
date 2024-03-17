import axios from "axios";
//การแสดงข้อมูล totalOpenDesk
export const totalOpenDesk = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalOpenDesk");
};

//การแสดงข้อมูล totalPrice
export const totalPrice = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPrice");
};

//การแสดงข้อมูล topPackage
export const topPackage = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-topPackage");
};

//การแสดงข้อมูล topMenu
export const topMenu = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-topMenu");
};

//การแสดงข้อมูล salesMonthly
export const salesMonthly = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-salesMonthly");
};
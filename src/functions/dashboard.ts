import axios from "axios";

//การแสดงข้อมูล totalPriceForDay
export const totalPriceForDay = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPriceForDay");
};

//การแสดงข้อมูล totalPriceForWeek
export const totalPriceForWeek = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPriceForWeek");
};

//การแสดงข้อมูล totalPriceForMonth
export const totalPriceForMonth = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPriceForMonth");
};

//การแสดงข้อมูล totalPriceForYear
export const totalPriceForYear = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPriceForYear");
};

//การแสดงข้อมูล totalPriceForMonthSegments
export const totalPriceForMonthSegments = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-totalPriceForMonthSegments");
};

//การแสดงข้อมูล packageSelectionInMonth
export const packageSelectionInMonth = async () => {
    return await axios.get(import.meta.env.VITE_API + "/dashboard-packageSelectionInMonth");
};
import { MenuStatus, MenuType, MenuTypeV2 } from "../types/menu";

export const menuStatusText = (status: MenuStatus) => {
    switch (status) {
        case "ready":
            return "พร้อม";
        case "notReady":
            return "ไม่พร้อม";
        default:
            return "ไม่พร้อมใช้งาน";
    }
};

export const menuTypeText = (status: MenuType) => {
    switch (status) {
        case "meat":
            return "เนื้อสัตว์";
        case "seaFood":
            return "อาหารทะเล";
        case "dessert":
            return "ของหวาน";
        case "drink":
            return "เครื่องดื่ม";
        case "fruit":
            return "ผลไม้";
        default:
            return "ไม่พร้อมใช้งาน";
    }
};

export const menuTypeTextV2 = (type: MenuTypeV2): string => {
    switch (type) {
        case "meat":
            return "เนื้อสัตว์";
        case "seaFood":
            return "อาหารทะเล";
        case "dessert":
            return "ของหวาน";
        case "drink":
            return "เครื่องดื่ม";
        case "fruit":
            return "ผลไม้";
        case "all":
            return "ทั้งหมด";
        default:
            return "ไม่พร้อมใช้งาน";
    }
};
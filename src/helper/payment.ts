import { PaymentStatus } from "../types/payment";

export const PaymentStatusText = (status: PaymentStatus) => {
    switch (status) {
        case "active":
            return "พร้อมใช้งาน";
        case "notActive":
            return "ไม่พร้อมใช้งาน";
        default:
            return "ไม่พร้อมใช้งาน";
    }
};
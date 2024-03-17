import { customerBookingStatus } from "../types/customer-booking";

export const customerBookingStatusText = (status: customerBookingStatus) => {
    switch (status) {
        case "preparing":
            return "กำลังใช้บริการ";
        case "processing":
            return "กรุณาชําระเงินที่เคาน์เตอร์";
        case "completed":
            return "ชำระเงินเสร็จสิ้น";
        default:
            return "กรุณาติดต่อพนักงาน";
    }
};

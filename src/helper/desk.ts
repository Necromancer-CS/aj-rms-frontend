import { DeskStatus } from "../types/desk";

export const deskColor = (status: DeskStatus) => {
  switch (status) {
    case "ready":
      return "#00b900";
    case "notReady":
      return "#CC0000";
    case "notAvailable":
      return "#CC0000";
    case "processing":
      return "#FFCC00";
    default:
      return "white";
  }
};

export const deskStatusText = (status: DeskStatus) => {
  switch (status) {
    case "ready":
      return "ว่าง";
    case "notReady":
      return "ไม่ว่าง";
    case "notAvailable":
      return "ไม่พร้อมใช้งาน";
    case "processing":
      return "รอชำระเงิน";
    default:
      return "ไม่พร้อมใช้งาน";
  }
};

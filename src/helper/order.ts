import { OrderStatus } from "src/types/order";

export const orderStatusText = (status: OrderStatus) => {
  switch (status) {
    case "notServed":
      return "กำลังจัดเตรียม";
    case "served":
      return "จัดส่งแล้ว";
    case "refuse":
      return "หมด";
    default:
      return "";
  }
};

export const orderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "notServed":
      return "#FFCC00";
    case "served":
      return "#00B900";
    case "refuse":
      return "#b0120a";
  }
};

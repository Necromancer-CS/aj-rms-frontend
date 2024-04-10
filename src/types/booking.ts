export interface CustomerBookingPayload {
  countAdult: number;
  countChildreng?: number | undefined;
  countChild?: number | undefined;
  packageId: string;
  deskNo: string;
}

export type CustomerBookingStatus = "processing" | "preparing" | "completed";

export interface CustomerBookingItem {
  _id: string;
  qrLink: string;
  deskNo: string;
  countAdult: number;
  countChildreng: number;
  countChild: number;
  packageId: string;
  packageName: string;
  chanelPayment: string;
  userOpenTable: string;
  userBilling: string;
  file: string;
  totalPrice: number
  status: CustomerBookingStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

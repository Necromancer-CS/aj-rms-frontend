export interface CustomerBookingPayload {
  countPerson: number;
  customerName: string;
  packageId: string;
  deskNo: string;
}

export type CustomerBookingStatus = "processing" | "preparing" | "completed";

export interface CustomerBookingItem {
  _id: string;
  customerName: string;
  qrLink: string;
  deskNo: string;
  countPerson: number;
  packageId: string;
  packageName: string;
  status: CustomerBookingStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

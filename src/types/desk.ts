export type DeskStatus = "ready" | "notReady" | "notAvailable" | "processing";

export interface DeskItem {
  _id: string;
  customerBookingId: string;
  deskNo: string;
  deskStatus: DeskStatus;
  chairCount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DeskStatusItem {
  title: string;
  value: DeskStatus;
}

export interface BillingPayload {
  customerBookingId: string;
  deskNo: string;
  countPerson: number;
  packagePrice: number;
  totalPrice: number;
  chanelPayment: string;
  change: number;
}

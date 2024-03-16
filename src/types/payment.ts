export type PaymentStatus = "active" | "notActive";

export interface PaymentItem {
    _id: string;
    paymentName: string;
    paymentStatus: PaymentStatus;
}

export interface PaymentStatusItem {
    title: string;
    value: PaymentStatus;
}

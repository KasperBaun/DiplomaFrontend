export class OrderDTO {
    id: number;
    customerId: number;
    paymentId: number;
    paymentStatus: string;
    deliveryStatus: string;
    discountCode: string | null;
    active: Boolean;
    orderElementIDs: number[];
    createdDate: Date;
}

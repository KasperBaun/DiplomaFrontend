export class OrderDTO {
    id: number;
    customerId: number;
    paymentId: number;
    discountCodeId: number;
    deliveryStatus: string;
    orderStatus: string;
    totalPrice: number;
    active: Boolean;
    createdDate: Date;
    orderElementIDs: number[];
}

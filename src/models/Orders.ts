export default class Order {
    id: number;
    customerId: number;
    paymentId: number;
    productItemId: number;
    paymentStatus: string;
    deliveryStatus: string;
    discountCode: string | null;
    active: Boolean;
  }
  
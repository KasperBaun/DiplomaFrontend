import OrderElements from "./OrderElements";

export default class Order {
    id?: number;
    customerId: number;
    paymentId: number;
    paymentStatus: string;
    deliveryStatus: string;
    active: Boolean;
    discountCode ?: string;
    orderElements: OrderElements[];
  }
  
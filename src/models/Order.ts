import OrderElements from "./OrderElements";

export default class Order {
    id?: number;
    customerId: number;
    paymentId: number;
    paymentStatus: string;
    deliveryStatus: string;
    discountCode: string | null;
    active: Boolean;
    orderElements: OrderElements[];
  }
  
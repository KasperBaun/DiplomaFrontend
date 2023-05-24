import { OrderElements } from "./OrderElements";
import { Payment } from "./Payment";

export class Order {
  id?: number;
  customerId: number;
  paymentId: number;
  payment: Payment;
  deliveryStatus: string;
  active: Boolean;
  discountCode?: string;
  orderElements: OrderElements[];
  createdDate: Date;
}

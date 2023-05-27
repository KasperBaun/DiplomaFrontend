import { Customer } from "./Customer";
import { DiscountCode } from "./DiscountCode";
import { Payment } from "./Payment";
import { ProductItem } from "./ProductItem";

export class Order {
  id?: number;
  customerId: number;
  customer: Customer;
  paymentId: number;
  payment: Payment;
  discountCodeId: number;
  discountCode: DiscountCode;
  deliveryStatus: string;
  orderStatus: string;
  totalPrice: number;
  active: Boolean;
  createdDate: Date;
  productItems: ProductItem[];
}

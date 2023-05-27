import { Customer } from "@models/Customer";
import { DiscountCode } from "@models/DiscountCode";
import { Payment } from "@models/Payment";

export class CreateOrderDTO {
  customer: Customer;
  discountCode: DiscountCode;
  payment: Payment;
  productItemIds: number[];
}
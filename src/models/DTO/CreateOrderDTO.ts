import { PaymentForm as Payment } from "@models/Checkout";
import { Customer } from "@models/Customer";
import { DiscountCode } from "@models/DiscountCode";

export class CreateOrderDTO {
  customer: Customer;
  discountCode: DiscountCode;
  payment: Payment;
  productItemsId: number[];
}
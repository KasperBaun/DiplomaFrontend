import Customer from "./Customer";

export class CheckoutForm {
    customer : Customer;
    deliveryMethod: string;
}

export class CardInfo {
    cardNumber: string;
    cardExpirationDate: string;
    cardHolderName: string;
    cardCVC: string;
}

export class MobilePayForm {
    phoneNumber: string;
}

export class PaymentForm {
    id ?: string;
    checkoutForm : CheckoutForm;
    paymentMethod : string;
    mobilePayPhone ?: MobilePayForm;
    cardInfo ?: CardInfo;
    paypal ?: boolean;
}
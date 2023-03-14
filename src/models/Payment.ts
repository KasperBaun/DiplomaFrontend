enum Method {
    VISA = "VISA",
    MC = "Master Card",
    DK = "Dankort",
    Stripe = "Stripe",
    MobilePay = "MobilePay",
}

export default class Payment{
    id: number;
    datePaid? : Date;
    amount? : number;
    approved? : number;
    method? : Method;
}
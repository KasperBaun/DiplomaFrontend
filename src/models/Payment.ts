export default class Payment{
    id: string;
    amount: number;
    currency: string;
    payment_method: string;
    status: string;
    created: number;
    client_secret: string;

    constructor(data: any) {
        this.id = data.id;
        this.amount = data.amount;
        this.currency = data.currency;
        this.payment_method = data.payment_method;
        this.status = data.status;
        this.created = data.created;
        this.client_secret = data.client_secret;
      }
}
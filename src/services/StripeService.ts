import { loadStripe, Stripe } from "@stripe/stripe-js";
import CrudHelper from "./CrudHelper";
import { Constants } from "@utils/Constants";
import Payment from "@models/Payment";

class StripeService {
  private stripe: Stripe;
  private apiBaseUrl: string;
  private crudHelper: CrudHelper;
  private stripePromise: Promise<Stripe>;

  constructor(private readonly publicKey: string, _apiBaseUrl: string) {
    this.stripe = null;
    this.stripePromise = loadStripe('pk_test_51MxptJFjBrRZR0EfGPxpkAUOqHc39aye7NgI7r3Oh6cLERLyfzJkHEaWPgySuFbqxfCUTXwBP5IyWzvaUAzVI61I00ngiTOIXg');
    this.crudHelper = new CrudHelper(Constants.loggingEnabled);
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.stripe = await loadStripe(this.publicKey);
  }

  public async createPaymentIntent(amount: number, currency: string, paymentMethodId: string, customerId: string): Promise<Payment> {
    await this.initialize();

    return await this.crudHelper.create(`${this.apiBaseUrl}/Payment`, "Payment", { id: 0, amount, currency, paymentMethodId, customerId });
  }
}

export default StripeService;

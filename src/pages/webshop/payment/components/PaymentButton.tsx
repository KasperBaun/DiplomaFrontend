import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LanguageStore } from '@stores/LanguageStore';
import { Button, Container, Form, Row } from 'react-bootstrap';

interface IPaymentButtonProps {
  ls: LanguageStore;
}

const PaymentButton = ({ ls }: IPaymentButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error: backendError, clientSecret } = await fetch(
      '/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodType: 'card',
          currency: 'usd',
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      console.log(backendError.message);
      return;
    }

    console.log('Client secret returned');

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: 'Jenny Rosen',
          },
        },
      }
    );

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    console.log(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  };

  return (
    <Container className="checkoutShoppingCart">
      <Row>
        <h4>Try a <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noopener noreferrer">test card</a>:</h4>
        <Row>
          <code>4242 4242 4242 4242</code> (Visa)
        </Row>
        <Row>
          <code>5555 5555 5555 4444</code> (Mastercard)
        </Row>
        <Row>
          <code>4000 0025 0000 3155</code> (Requires <a href="https://www.youtube.com/watch?v=2kc-FjU2-mY" target="_blank" rel="noopener noreferrer">3DSecure</a>)
        </Row>
      </Row>

      <Form id="payment-form" onSubmit={handleSubmit}>
        <Form.Label htmlFor="card">Card</Form.Label>
        <CardElement id="card" />

        <Button type="submit">Pay</Button>
      </Form>

      <p> <a href="https://youtu.be/IhvtIbfDZJI" target="_blank">Watch a demo walkthrough</a> </p>
    </Container>
  );
};

export default PaymentButton;

      //const stripe = await loadStripe('pk_test_51MxptJFjBrRZR0EfGPxpkAUOqHc39aye7NgI7r3Oh6cLERLyfzJkHEaWPgySuFbqxfCUTXwBP5IyWzvaUAzVI61I00ngiTOIXg');

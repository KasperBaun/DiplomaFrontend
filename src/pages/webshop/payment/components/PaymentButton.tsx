import { LanguageStore } from '@stores/LanguageStore';
import { Button, Form } from 'react-bootstrap';

interface IPaymentButtonProps {
  ls: LanguageStore;
  handleOnSubmitClick : () => void;
}

const PaymentButton = ({ ls, handleOnSubmitClick }: IPaymentButtonProps) => {

  return (
    <Form.Group style={{ textAlign: "right", margin: "0 auto", padding: "0.5rem" }}>
      <Button style={{ width: "10rem" }} variant="outline-primary" onClick={handleOnSubmitClick}>
          { ls.currentLanguage.CheckoutPaymentWidgetPayButtonText }
      </Button>
  </Form.Group>
  );
};

export default PaymentButton;

      //const stripe = await loadStripe('pk_test_51MxptJFjBrRZR0EfGPxpkAUOqHc39aye7NgI7r3Oh6cLERLyfzJkHEaWPgySuFbqxfCUTXwBP5IyWzvaUAzVI61I00ngiTOIXg');

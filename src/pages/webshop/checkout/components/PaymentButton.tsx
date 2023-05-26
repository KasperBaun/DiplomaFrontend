import { LanguageStore } from '@stores/LanguageStore';
import { Button, Form } from 'react-bootstrap';

type PaymentButtonProps = {
  ls: LanguageStore;
  handleOnSubmitClick: () => void;
}

export const PaymentButton = ({ ls, handleOnSubmitClick }: PaymentButtonProps) => {

  return (
    <Form.Group style={{ textAlign: "right", margin: "0 auto", padding: "0.5rem" }}>
      <Button style={{ width: "10rem" }} variant="outline-primary" onClick={handleOnSubmitClick}>
        {ls.currentLanguage.CheckoutPaymentWidgetPayButtonText}
      </Button>
    </Form.Group>
  );
};
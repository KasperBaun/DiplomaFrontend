import { useContext, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import MobXContext from "@stores/MobXContext";
import { PaymentButton } from "./PaymentButton";


interface CardOptions {
  name: string;
  id: number;
  component: React.ReactNode;
}

const cardOptions: CardOptions[] = [
  {
    name: 'VISA',
    id: 0,
    component: (
      <Card key={0} className="CreditCardOption" >
        <Card.Img className="CreditCardOptionImage" src="https://w7.pngwing.com/pngs/400/28/png-transparent-credit-card-computer-icons-visa-electron-bank-curio-blue-text-rectangle.png" alt="Card image" />
      </Card>
    ),
  },
  {
    name: 'MasterCard',
    id: 1,
    component: (
      <Card key={1} className="CreditCardOption">
        <Card.Img className="CreditCardOptionImage" src="https://purepng.com/public/uploads/large/purepng.com-mastercard-logologobrand-logoiconslogos-251519938372dnf77.png" alt="Card image" />
      </Card>
    ),
  },
  {
    name: 'American Express',
    id: 2,
    component: (
      <Card key={2} className="CreditCardOption">
        <Card.Img className="CreditCardOptionImage" src="https://cdn.iconscout.com/icon/free/png-256/free-americanexpress-credit-debit-card-bank-transaction-32287.png" alt="Card image" />
      </Card>
    ),
  },
];



export const PaymentCreditCardForm = () => {
  const { basketStore, languageStore: ls } = useContext(MobXContext);
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardHolderNameValid, setCardHolderNameValid] = useState(false);
  const [cvc, setCvc] = useState('');
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [expirationValid, setExpirationValid] = useState(false);
  const [cvcValid, setCvcValid] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handlePaymentOptionClick = (cardId: number) => {
    basketStore.OrderDTO.payment.method = "Creditcard";
    setSelectedCard(cardId);
  };

  const handleCardHolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setCardHolderName(input);
    setCardHolderNameValid(true);
  }

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = event.target.value.replace(/\s+/g, '').match(/.{1,4}/g)?.join(' ') || '';
    setCardNumber(formattedNumber);
    setCardNumberValid(formattedNumber.length === 19); // Validate that the card number is 16 digits long
  };

  const handleExpirationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\s+/g, '');
    setExpiration(input);
    setExpirationValid(true);
  };


  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCvc = event.target.value.replace(/\s+/g, '').slice(0, 3) || '';
    setCvc(formattedCvc);
    setCvcValid(/^\d{3}$/.test(formattedCvc)); // Validate that the CVC is exactly 3 digits long
  };

  return (
    <Container className="checkoutShoppingCart">
      <Form>
        <Form.Group>
          <Row>
            {cardOptions.map((cardOption) => (
              <Col style={{ alignContent: "center" }} key={cardOption.id} onClick={() => handlePaymentOptionClick(cardOption.id)}>
                <div className={`CreditCardOption${selectedCard === cardOption.id ? ' selected' : ''}`}>
                  {cardOption.component}
                </div>
              </Col>
            ))}
          </Row>
        </Form.Group>
        <Form.Group className="PaymentCreditCardFormGroup">
          <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormCardLabel} </Form.Label>
          <Form.Control
            type="text"
            placeholder="4444 5555 4444 2525"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className={cardNumberValid ? 'is-valid' : 'is-invalid'}
          />
        </Form.Group>
        <Form.Group className="PaymentCreditCardFormGroup">
          <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormMMYYLabel} </Form.Label>
          <Form.Control
            type="text"
            placeholder="MM/YY"
            value={expiration}
            onChange={handleExpirationChange}
            className={expirationValid ? 'is-valid' : 'is-invalid'}
          />
        </Form.Group>
        <Form.Group className="PaymentCreditCardFormGroup">
          <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormCardHolderLabel} </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Card Holder Name"
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            className={cardHolderNameValid ? 'is-valid' : 'is-invalid'}
          />
        </Form.Group>
        <Form.Group className="PaymentCreditCardFormGroup">
          <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormSecureLabel} </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CVC"
            value={cvc}
            onChange={handleCvcChange}
            className={cvcValid ? 'is-valid' : 'is-invalid'}
          />
        </Form.Group>
      </Form>
    </Container>
  )
}

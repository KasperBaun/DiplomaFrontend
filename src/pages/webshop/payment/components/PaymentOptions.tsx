import { Dispatch, SetStateAction } from "react";
import { Card, Col, Container, Row } from "react-bootstrap"

interface IPaymentOptionsProps {
    setSelectedPaymentOption : Dispatch<SetStateAction<number>>;
}

interface PaymentOption {
    name: string;
    id: number;
    component: React.ReactNode;
  }
  
  const paymentOptions: PaymentOption[] = [
    {
      name: 'MobilePay',
      id: 0,
      component: (
        <Card key={0} className="PaymentCard" >
            <Card.Img className="PaymentCardImage" src="https://comeanddance.dk/wp-content/uploads/2017/12/mobilepay-logo.png?w=640" alt="Card image" />
            <Card.Body style={{ textAlign: "center", fontSize: "small" }}>
                <Card.Text>MobilePay</Card.Text>
            </Card.Body>
        </Card>
      ),
    },
    {
      name: 'Credit Card',
      id: 1,
      component: (
        <Card key={1} className="PaymentCard">
            <Card.Img className="PaymentCardImage" src="https://w7.pngwing.com/pngs/117/675/png-transparent-visa-and-mastercard-ads-mastercard-credit-card-american-express-visa-debit-card-mastercard-text-payment-logo.png" alt="Card image" />
            <Card.Body style={{ textAlign: "center", fontSize: "small" }}>
                <Card.Text>Credit Card</Card.Text>
            </Card.Body>
        </Card>
      ),
    },
    {
      name: 'Paypal',
      id: 2,
      component: (
        <Card key={2} className="PaymentCard">
            <Card.Img className="PaymentCardImage" src="https://img.freepik.com/free-icon/paypal_318-674245.jpg" alt="Card image" />
            <Card.Body style={{ textAlign: "center", fontSize: "small" }}>
                <Card.Text>Paypal</Card.Text>
            </Card.Body>
        </Card>
      ),
    },
  ];

export const PaymentOptions = ( props : IPaymentOptionsProps ) => {

    const handlePaymentOptionClick = (paymentOption: number) => {
        props.setSelectedPaymentOption(paymentOption);
    };

    return (
        <Container className="checkoutShoppingCart">
            <Row>
            { paymentOptions.map((paymentOption, index) => (
                <Col key={index} onClick={() => handlePaymentOptionClick(paymentOption.id)}>
                    {paymentOption.component}
                </Col>
            )) }
            </Row>
        </Container>
    )
}
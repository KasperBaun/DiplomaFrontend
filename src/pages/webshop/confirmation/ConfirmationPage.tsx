import { Col, Container, Row } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";

interface IPaymentForm {
    checkoutForm : ICheckoutForm;
    paymentMethod : string;
    mobilePayPhone ?: string;
    cardInfo ?: ICardInfoForm;
    paypal ?: boolean;
}

interface ICheckoutForm {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    countryCode: string;
    phone: string;
    deliveryMethod: string;
}

interface ICardInfoForm {
    cardNumber: string;
    cardExpirationDate: string;
    cardHolderName: string;
    cardCVC: string;
}

interface IMPInfoForm {
    phoneNumber: string;
}

interface IConfirmationPageProps {
    paymentForm ?: IPaymentForm;
}

const ConfirmationPage = ( {paymentForm} : IConfirmationPageProps ) => {

    // Create a user with the checkoutForm details
    // Create an order and return the order number
        // Get the order number

    

    return (
        <Container>
            <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                <Col md={12}><h1>Thank you!</h1></Col>
                <Col md={12}><h3>Your order {} has been placed!</h3></Col>
                { paymentForm?.checkoutForm?.email ? (
                    <Col md={12}><h5>Confirmation email has been sent to {paymentForm.checkoutForm.email}</h5></Col>
                ) : (<></>) }
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <ShippingProgress />
            </Row>
            <Row style={{ justifyContent: "center" }}>
                <Col md={8}>
                    <Row>
                        <h3>Order List</h3>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row>
                        <h3>Order Summary</h3>
                    </Row>
                </Col>
            </Row>
        </Container>
    )

}

export default ConfirmationPage;
import { Col, Container, Row } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";
import { useParams } from "react-router-dom";
import { PaymentForm } from "@models/Checkout";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@components/loading/Loading";
import Customer from "@models/Customer";



const ConfirmationPage = () => {

    let { id } = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const { languageStore, webshopStore } = useContext(MobXContext);
    const paymentForm : PaymentForm = webshopStore.getCheckoutPaymentById(Number(id));
    // Create a user with the checkoutForm details
        // Check if user exists by email, if not create user. Return user info if user exists
    const createCustomer = async () => {
        return await webshopStore.createCustomer(paymentForm.checkoutForm.customer);
    }

    useEffect(() => {
        createCustomer().then((customer) => {
            setCustomer(customer);
        });
    });

    // Create an order and return the order number
    if(customer)
        webshopStore.createOrder({
            customerId: customer.id,
            paymentId: paymentForm.id,
            paymentStatus: "Approved",
            deliveryStatus: paymentForm.checkoutForm.deliveryMethod,
            discountCode: "",
            active: true,
            orderElements: []
        })
        // Get the order number from API as return from create or as a GET fetch

    if(customer) {
        return (
            <Container>
                <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                    <Col md={12}><h1>Thank you!</h1></Col>
                    <Col md={12}><h3>Your order {} has been placed!</h3></Col>
                    <Col md={12}><h5>Confirmation email has been sent to {customer.email}</h5></Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <ShippingProgress customer={customer} deliveryMethod={paymentForm.checkoutForm.deliveryMethod} />
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
        );
    }
    else {
        <Loading />
    }
}

export default ConfirmationPage;
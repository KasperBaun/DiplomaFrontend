import { Col, Container, Row } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";
import { useParams } from "react-router-dom";
import { PaymentForm } from "@models/Checkout";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@components/loading/Loading";
import Customer from "@models/Customer";
import Payment from "@models/Payment";



const ConfirmationPage = () => {

    let { id } = useParams();
    const [customer, setCustomer] = useState<Customer>();
    const [payment, setPayment] = useState<Payment>();
    const { languageStore, webshopStore, basketStore } = useContext(MobXContext);
    const paymentForm : PaymentForm = webshopStore.getCheckoutPaymentById(id);
    // Create a user with the checkoutForm details
        // Check if user exists by email, if not create user. Return user info if user exists
    const createCustomer = async () => {
        return await webshopStore.createCustomer(paymentForm.checkoutForm.customer);
    }

    const createPayment = async () => {
        return await webshopStore.createPayment({
            amount : totalPrice,
            datePaid : new Date().getTime(),
            method: paymentForm.paymentMethod,
            approved: true,
        });
    }

    useEffect(() => {
        createCustomer().then((customer) => {
            setCustomer(customer);
        });

        createPayment().then((payment) => {
            setPayment(payment);
        });
    });
    
    let totalPrice = 0;
    if(customer) {
        basketStore.Basket.map((item) => {
            totalPrice += item.currentPrice;
        })
        // Create Payment. We need payment id for Order
        webshopStore.createPayment({
            amount : totalPrice,
            datePaid : new Date().getTime(),
            method: paymentForm.paymentMethod,
            approved: true,
        });

        // Create an order and return the order number
            webshopStore.createOrder({
                customerId: customer.id,
                paymentId: payment.id,
                paymentStatus: "Approved",
                deliveryStatus: paymentForm.checkoutForm.deliveryMethod,
                discountCode: "",
                active: true,
                orderElements: []
            })
            // Get the order number from API as return from create or as a GET fetch
    }

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
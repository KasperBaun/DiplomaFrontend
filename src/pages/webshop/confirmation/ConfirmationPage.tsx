import { Col, Container, Row } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";
import { useParams } from "react-router-dom";
import { PaymentForm } from "@models/Checkout";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@components/loading/Loading";
import Payment from "@models/Payment";
import OrderElements from "@models/OrderElements";
import Order from "@models/Order";



const ConfirmationPage = () => {

    let { id } = useParams();
    const [payment, setPayment] = useState<Payment>();
    const [order, setOrder] = useState<Order>();
    const { languageStore, webshopStore, basketStore } = useContext(MobXContext);
    const paymentForm : PaymentForm = webshopStore.PaymentForm;

    let totalPrice = 0;
    let orderElements : OrderElements[] = [];

    basketStore.Basket.map((item) => {
        totalPrice += item.currentPrice;
        orderElements.push({
            productItemId: item.id,
            productItem: {
                id: item.id,
                currentPrice: item.currentPrice,
                createdDate: item.createdDate,
                condition: item.condition,
                quality: item.quality,
                weight: item.weight,
                customText: item.customText,
                productId: item.productId,
                product: item.product,
                images: item.images,
                sold: true,
                purchasePrice: 0,
            },
        })
    })

    // Create a user with the checkoutForm details
    // Check if user exists by email, if not create user. Return user info if user exists

    const createPayment = async () => {
        if(webshopStore.PaymentForm)
        return await webshopStore.createPayment({
            amount : totalPrice,
            datePaid : new Date().toISOString().slice(0, 19).replace('T', ' '),
            method: webshopStore.PaymentForm.paymentMethod,
            approved: true,
        });
    }

    // Create an order and return the order number
    // Get the order number from API as return from create or as a GET fetch
    const createOrder = async () => {
        if(webshopStore.Customer && webshopStore.PaymentForm && payment)
            console.log({
                customerId: webshopStore.Customer.id,
                paymentId: payment.id,
                paymentStatus: "Approved",
                deliveryStatus: "Afhent",
                active: true,
                orderElements: orderElements
            })
            return await webshopStore.createOrder({
                customerId: webshopStore.Customer.id,
                paymentId: payment.id,
                paymentStatus: "Approved",
                deliveryStatus: "Afhent",
                active: true,
                orderElements: orderElements
            });
    }

    useEffect(() => {
        if(!payment)
            createPayment().then((payment) => {
                setPayment(payment);
            });

        if(!order)
            createOrder().then((order) => {
                setOrder(order);
            })
    }, );

    if(webshopStore.Customer && webshopStore.PaymentForm) {
        return (
            <Container>
                <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                    <Col md={12}><h1>Thank you!</h1></Col>
                    <Col md={12}><h3>Your order {} has been placed!</h3></Col>
                    <Col md={12}><h5>Confirmation email has been sent to {webshopStore.Customer.email}</h5></Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <ShippingProgress customer={webshopStore.Customer} deliveryMethod={webshopStore.PaymentForm.deliveryMethod ? "Afhent" : ""} />
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
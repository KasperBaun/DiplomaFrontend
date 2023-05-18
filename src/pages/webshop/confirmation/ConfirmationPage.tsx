import { Col, Container, Row } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";
import { useParams } from "react-router-dom";
import { PaymentForm } from "@models/Checkout";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@components/loading/LoadingLion";
import Payment from "@models/Payment";
import OrderElements from "@models/OrderElements";
import Order from "@models/Order";
import CreateOrderDTO from "@models/DTO/CreateOrderDTO";
import ConfirmationModel from "@models/ConfirmationModel";



const ConfirmationPage = () => {
    let { id } = useParams();
    const [payment, setPayment] = useState<Payment>();
    const [order, setOrder] = useState<Order>();

    const [preOrder, setPreOrder] = useState<CreateOrderDTO>();
    const [confirmation, setConfirmation] = useState<ConfirmationModel>();
    const { languageStore, webshopStore, basketStore } = useContext(MobXContext);
    let productIds : number[] = [];

    let totalPrice = 0;

    basketStore.Basket.map((item) => {
        totalPrice += item.currentPrice;
        productIds.push(item.id);
    });

    useEffect(() => {
        setPreOrder({
            paymentForm: webshopStore.PaymentForm,
            customer: webshopStore.Customer,
            productItemsId: productIds,
            totalPrice: totalPrice,
        });
    }, [basketStore.Basket, webshopStore.PaymentForm, webshopStore.Customer, totalPrice]);

    const createOrder = async () => {
        return await webshopStore.createOrder(preOrder);
    };

    useEffect(() => {
        createOrder().then((response) => {
            setConfirmation(response);
        });

        // get order from database
    }, [id, createOrder]);

    if(webshopStore.Customer && webshopStore.PaymentForm && order !== undefined) {
        return (
            <Container>
                <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                    <Col md={12}><h1>Thank you!</h1></Col>
                    <Col md={12}><h3>Your order {"O" + order.paymentId + "" + order.paymentId + "" + order.orderElements.length} has been placed!</h3></Col>
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
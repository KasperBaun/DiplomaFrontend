import { Col, Container, Row, Table } from "react-bootstrap";
import "./css/confirmationpage.scss"
import ShippingProgress from "./components/ShippingProgress";
import { useParams } from "react-router-dom";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@components/loading/LoadingLion";
import Payment from "@models/Payment";
import Order from "@models/Order";
import CreateOrderDTO from "@models/DTO/CreateOrderDTO";
import ConfirmationModel from "@models/ConfirmationModel";



const ConfirmationPage = () => {
    let { id } = useParams();
    const [payment, setPayment] = useState<Payment>();
    const [order, setOrder] = useState<Order>();

    const [preOrder, setPreOrder] = useState<CreateOrderDTO>();
    const [confirmation, setConfirmation] = useState<Order>();
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
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Produkt</th>
                                        <th>Modelnummer</th>
                                        <th>Pris</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {basketStore.Basket.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.modelNumber}</td>
                                                <td>{item.currentPrice}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row>
                            <h3>Order Summary</h3>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={10}>
                                <p>Subtotal </p>
                            </Col>
                            <Col md={2}>
                                {totalPrice} DKK
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <p>Shipping & Handling</p>
                            </Col>
                            <Col md={2}>
                                {50} DKK
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <p>Heraf Moms 25%</p>
                            </Col>
                            <Col md={2}>
                                {(totalPrice*0.25)} DKK
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <p>Total</p>
                            </Col>
                            <Col md={2}>
                                {totalPrice + (totalPrice*0.25)} DKK
                            </Col>
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
import LoadingLion from "@components/loading/LoadingLion";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { ShippingProgress } from "./components/ShippingProgress";
import Loading from "@components/loading/Loading";
import { Grid, Typography } from "@mui/material";



export const ConfirmationPage = observer(() => {

    const { basketStore } = useContext(MobXContext);
    let productIds: number[] = [];

    let totalPrice = 0;

    for (var i = 0; i < basketStore.Basket.length; i++) {
        var item = basketStore.Basket[i];
        totalPrice += item.currentPrice;
        productIds.push(item.id);

    }


    if (basketStore.OrderCreated) {
        basketStore.resetBasket();
        return (
            <Container>
                <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
                    <Col md={12}><h1>Thank you!</h1></Col>
                    <Col md={12}><h3>Your order {"O" + basketStore.Order.paymentId + "" + basketStore.Order.paymentId + "" + basketStore.Order.productItems ? basketStore.Order.productItems.length : 0} has been placed!</h3></Col>
                    <Col md={12}><h5>Confirmation email has been sent to {basketStore.Customer.email}</h5></Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <ShippingProgress customer={basketStore.Customer} deliveryMethod={basketStore.Order.deliveryStatus ? "Afhent" : ""} />
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
                                {(totalPrice * 0.25)} DKK
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <p>Total</p>
                            </Col>
                            <Col md={2}>
                                {totalPrice + (totalPrice * 0.25)} DKK
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        return <Container fluid>
            <Grid container display='flex' justifyContent='center'>
                <Typography variant="h4">
                    No order is being processed at the moment
                </Typography>
            </Grid>
        </Container>
    }
});
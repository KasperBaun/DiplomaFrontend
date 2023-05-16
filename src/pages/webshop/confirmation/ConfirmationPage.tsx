import { Col, Container, Row, Table } from "react-bootstrap";
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

    basketStore.Basket.map((item) => {
        productIds.push(item.id);
    });

    useEffect(() => {
        let isMounted = true;

        setPreOrder({
            paymentForm: webshopStore.PaymentForm,
            customer: webshopStore.Customer,
            productItemsId: productIds
        });

        const createOrder = async () => {
            try{
                const response = await webshopStore.createOrder(preOrder);
                if (isMounted){
                    setConfirmation(response);
                    isMounted = false;
                }
            } catch (error){
                console.log("Error: create order")
            }
        };

        createOrder();
        return () => {
            isMounted = false;
          };
        },[preOrder, productIds, webshopStore]);
      
   
    // useEffect(() => {
    //     createOrder().then((response) => {
    //         setConfirmation(response);
    //     });

    //     // get order from database
    // }, [id, createOrder]);

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
                                {/* {totalPrice} DKK */}
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
                                {/* {(totalPrice*0.25)} DKK */}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <p>Total</p>
                            </Col>
                            <Col md={2}>
                                {/* {totalPrice + (totalPrice*0.25)} DKK */}
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
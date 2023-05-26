import { observer } from "mobx-react-lite";



export const ConfirmationPage = observer(() => {
    return (<></>)
    // let { id } = useParams();
    // const [payment, setPayment] = useState<Payment>();
    // const [order, setOrder] = useState<Order>();

    // const [preOrder, setPreOrder] = useState<CreateOrderDTO>();
    // const [confirmation, setConfirmation] = useState<Order>();
    // const { languageStore, webshopStore, basketStore } = useContext(MobXContext);
    // let productIds: number[] = [];

    // let totalPrice = 0;

    // basketStore.Basket.map((item) => {
    //     totalPrice += item.currentPrice;
    //     productIds.push(item.id);
    // });

    // const createOrder = async () => {
    //     return await basketStore.createOrder();
    // };


    // if (webshopStore.Customer && webshopStore.PaymentForm && order !== undefined) {
    //     return (
    //         <Container>
    //             <Row style={{ textAlign: "center", margin: "1rem", padding: "1rem" }}>
    //                 <Col md={12}><h1>Thank you!</h1></Col>
    //                 <Col md={12}><h3>Your order {"O" + order.paymentId + "" + order.paymentId + "" + order.orderElements.length} has been placed!</h3></Col>
    //                 <Col md={12}><h5>Confirmation email has been sent to {webshopStore.Customer.email}</h5></Col>
    //             </Row>
    //             <Row style={{ justifyContent: "center" }}>
    //                 <ShippingProgress customer={webshopStore.Customer} deliveryMethod={webshopStore.PaymentForm.deliveryMethod ? "Afhent" : ""} />
    //             </Row>
    //             <Row style={{ justifyContent: "center" }}>
    //                 <Col md={8}>
    //                     <Row>
    //                         <h3>Order List</h3>
    //                     </Row>
    //                     <Row>
    //                         <Table striped bordered hover>
    //                             <thead>
    //                                 <tr>
    //                                     <th>Produkt</th>
    //                                     <th>Modelnummer</th>
    //                                     <th>Pris</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {basketStore.Basket.map((item) => {
    //                                     return (
    //                                         <tr key={item.id}>
    //                                             <td>{item.product.name}</td>
    //                                             <td>{item.product.modelNumber}</td>
    //                                             <td>{item.currentPrice}</td>
    //                                         </tr>
    //                                     );
    //                                 })}
    //                             </tbody>
    //                         </Table>
    //                     </Row>
    //                 </Col>
    //                 <Col md={4}>
    //                     <Row>
    //                         <h3>Order Summary</h3>
    //                     </Row>
    //                     <hr />
    //                     <Row>
    //                         <Col md={10}>
    //                             <p>Subtotal </p>
    //                         </Col>
    //                         <Col md={2}>
    //                             {totalPrice} DKK
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col md={10}>
    //                             <p>Shipping & Handling</p>
    //                         </Col>
    //                         <Col md={2}>
    //                             {50} DKK
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col md={10}>
    //                             <p>Heraf Moms 25%</p>
    //                         </Col>
    //                         <Col md={2}>
    //                             {(totalPrice * 0.25)} DKK
    //                         </Col>
    //                     </Row>
    //                     <Row>
    //                         <Col md={10}>
    //                             <p>Total</p>
    //                         </Col>
    //                         <Col md={2}>
    //                             {totalPrice + (totalPrice * 0.25)} DKK
    //                         </Col>
    //                     </Row>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     );
    // }
    // else {
    //     <LoadingLion />
    // }
});
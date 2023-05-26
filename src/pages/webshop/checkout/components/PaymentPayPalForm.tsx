import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Container, Form } from "react-bootstrap";



export const PaymentPaypalForm = () => {

    const { basketStore } = useContext(MobXContext);

    const handlePaypalNumberChanged = () => {
        basketStore.OrderDTO.payment.method = "PayPal";
    }

    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group style={{ textAlign: "center", margin: "0 auto", padding: "0.5rem" }}>
                    <Form.Control type="text" placeholder="+45 " onChange={handlePaypalNumberChanged} />
                </Form.Group>
            </Form>
        </Container>
    )
}

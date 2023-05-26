import { Container, Form } from "react-bootstrap";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";



export const PaymentMobilePayForm = () => {

    const { basketStore, languageStore: ls } = useContext(MobXContext);

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const temp = event.target.value;
        basketStore.OrderDTO.payment.method = "MobilePay";
    };
    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group>
                    <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormMPLabel} </Form.Label>
                    <Form.Control type="phone" placeholder="+45 " onChange={handleCardNumberChange} />
                </Form.Group>
            </Form>
        </Container>
    )
}

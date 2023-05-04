import { LanguageStore } from "@stores/LanguageStore";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface IPaymentPaypalFormProps {
    ls : LanguageStore;
    handleOnSubmitClick : () => void;
}

const PaymentPaypalForm = ( {ls} : IPaymentPaypalFormProps ) => {

    const navigate = useNavigate();

    const handleOnSubmit = () => {
        navigate('www.paypal.com')
    }

    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group style={{ textAlign: "center", margin: "0 auto", padding: "0.5rem" }}>
                    <Button style={{ width: "10rem" }} variant="outline-primary" onClick={handleOnSubmit}>
                        { ls.currentLanguage.CheckoutPaymentWidgetPayButtonText } med Paypal
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default PaymentPaypalForm;
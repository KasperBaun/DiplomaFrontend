import { LanguageStore } from "@stores/LanguageStore";
import { Button, Container, Form } from "react-bootstrap";

interface IPaymentMobilePayFormProps {
    ls : LanguageStore;
}

const PaymentMobilePayForm = ( {ls} : IPaymentMobilePayFormProps ) => {
    return (
        <Container>
            <Form>
                <Form.Group>
                    <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormMPLabel} </Form.Label>
                    <Form.Control type="phone" placeholder="+45 " />
                </Form.Group>
                <Button variant="primary" type="submit">
                    { ls.currentLanguage.CheckoutPaymentWidgetPayButtonText }
                </Button>
            </Form>
        </Container>
    )
}

export default PaymentMobilePayForm;
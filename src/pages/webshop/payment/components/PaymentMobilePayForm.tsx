import { LanguageStore } from "@stores/LanguageStore";
import { Button, Container, Form } from "react-bootstrap";
import PaymentButton from "./PaymentButton";

interface IPaymentMobilePayFormProps {
    ls : LanguageStore;
    handleOnSubmitClick : () => void;
}

const PaymentMobilePayForm = ( {ls, handleOnSubmitClick} : IPaymentMobilePayFormProps ) => {

    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group>
                    <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormMPLabel} </Form.Label>
                    <Form.Control type="phone" placeholder="+45 " />
                </Form.Group>
                <PaymentButton ls={ls} handleOnSubmitClick={handleOnSubmitClick} />
            </Form>
        </Container>
    )
}

export default PaymentMobilePayForm;
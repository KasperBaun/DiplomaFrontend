import { LanguageStore } from "@stores/LanguageStore";
import { Dispatch, SetStateAction } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface IPaymentPaypalFormProps {
    ls : LanguageStore;
    handleOnSubmitClick : () => void;
    setPaypalApproved : Dispatch<SetStateAction<boolean>>;
}

const PaymentPaypalForm = ( {ls, handleOnSubmitClick, setPaypalApproved} : IPaymentPaypalFormProps ) => {


    const handleOnSubmit = () => {
        setPaypalApproved(true);
        handleOnSubmitClick();
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
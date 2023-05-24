import { LanguageStore } from "@stores/LanguageStore";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface IPaymentPaypalFormProps {
    ls: LanguageStore;
    handleOnSubmitClick: () => void;
}

export const PaymentPaypalForm = ({ ls, handleOnSubmitClick }: IPaymentPaypalFormProps) => {

    const { webshopStore } = useContext(MobXContext);

    const handleOnSubmit = () => {
        webshopStore.setPayPalForm(true);
        handleOnSubmitClick();
    }

    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group style={{ textAlign: "center", margin: "0 auto", padding: "0.5rem" }}>
                    <Button style={{ width: "10rem" }} variant="outline-primary" onClick={handleOnSubmit}>
                        {ls.currentLanguage.CheckoutPaymentWidgetPayButtonText} med Paypal
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

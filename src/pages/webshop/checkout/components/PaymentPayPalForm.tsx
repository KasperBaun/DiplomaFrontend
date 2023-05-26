import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";

interface IPaymentPaypalFormProps {
    handleOnSubmitClick: () => void;
}

export const PaymentPaypalForm = ({ handleOnSubmitClick }: IPaymentPaypalFormProps) => {

    const { webshopStore, languageStore: ls } = useContext(MobXContext);

    const handleOnSubmit = () => {
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

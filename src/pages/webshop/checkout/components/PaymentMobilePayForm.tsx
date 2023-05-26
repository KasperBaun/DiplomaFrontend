import { Container, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import MobXContext from "@stores/MobXContext";
import { PaymentButton } from "./PaymentButton";

interface IPaymentMobilePayFormProps {
    handleOnSubmitClick : () => void;
}

export const PaymentMobilePayForm = ( { handleOnSubmitClick} : IPaymentMobilePayFormProps ) => {

    const [mobilePayNumber, setMobilePayNumber] = useState<string>(null);
    const { webshopStore, languageStore: ls } = useContext(MobXContext);

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const temp = event.target.value;
        setMobilePayNumber(temp);
    };

    const handleOnSubmit = () => {
        webshopStore.setMobilePayForm({phoneNumber: mobilePayNumber})
        console.log({phoneNumber: mobilePayNumber})
        handleOnSubmitClick();
    }

    return (
        <Container className="checkoutShoppingCart">
            <Form>
                <Form.Group>
                    <Form.Label> {ls.currentLanguage.CheckoutPaymentWidgetPayFormMPLabel} </Form.Label>
                    <Form.Control type="phone" placeholder="+45 " onChange={handleCardNumberChange} />
                </Form.Group>
                <PaymentButton ls={ls} handleOnSubmitClick={handleOnSubmit} />
            </Form>
        </Container>
    )
}

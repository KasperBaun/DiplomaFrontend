import { LanguageStore } from "@stores/LanguageStore";
import { Button, Container, Form } from "react-bootstrap";
import PaymentButton from "./PaymentButton";
import { Dispatch, SetStateAction, useState } from "react";

interface IPaymentMobilePayFormProps {
    ls : LanguageStore;
    handleOnSubmitClick : () => void;
    setMobilePayPhone : Dispatch<SetStateAction<IMPInfoForm>>;
}

interface IMPInfoForm {
    phoneNumber: string;
}

const PaymentMobilePayForm = ( {ls, handleOnSubmitClick, setMobilePayPhone} : IPaymentMobilePayFormProps ) => {

    const [mobilePayNumber, setMobilePayNumber] = useState<string>(null);

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const temp = event.target.value;
        setMobilePayNumber(temp);
    };

    const handleOnSubmit = () => {
        setMobilePayPhone({phoneNumber: mobilePayNumber})
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

export default PaymentMobilePayForm;
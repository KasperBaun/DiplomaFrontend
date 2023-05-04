import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentPaypalForm = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('www.paypal.com')
    }

    return (
        <Container>
            <Button variant="primary" onClick={handleOnClick}>Paypal</Button>
        </Container>
    )
}

export default PaymentPaypalForm;
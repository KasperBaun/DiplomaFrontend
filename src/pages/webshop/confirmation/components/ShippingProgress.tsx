import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface ICheckoutForm {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    zipCode: string;
    city: string;
    country: string;
    countryCode: string;
    phone: string;
    deliveryMethod: string;
}

interface IShippingProgressProps { 
    shippingDetails ?: ICheckoutForm;
}

const ShippingProgress = ( {shippingDetails} : IShippingProgressProps ) => {
    return (
        <Container>
            <Row className="ShippingProgressRow">
                <Col className="ShippingProgressBox" md={4}>
                    {/* Shipping Info & Method */}
                    <Col md={12}>
                        <LocalShippingIcon className="ShippingProgressBoxIcons" />
                    </Col>
                    <Col md={12}>
                        <h3>Shipping</h3>
                        <Container>
                            <Row>{`${shippingDetails?.firstName ? shippingDetails.firstName : ""} ${shippingDetails?.lastName ? shippingDetails.lastName : ""}`}</Row>
                            <Row>{`${shippingDetails?.address}`}</Row>
                            <Row>{`${shippingDetails?.zipCode} ${shippingDetails?.city}`}</Row>
                            <Row>{`${shippingDetails?.country}`}</Row>
                            <Row>{`${shippingDetails?.countryCode}${shippingDetails?.phone}`}</Row>
                        </Container>
                    </Col>

                </Col>
                <Col className="ShippingProgressBox" md={4}>
                    {/* Recipient Info */}
                </Col>
                <Col className="ShippingProgressBox" md={4}>
                    {/* Shipping Status */}
                </Col>
            </Row>
            <Row className="ShippingProgressRow">
                <ProgressBar className="ShippingProgressBar" animated striped variant="warning" now={33} />
            </Row>
        </Container>
    )
}

export default ShippingProgress;
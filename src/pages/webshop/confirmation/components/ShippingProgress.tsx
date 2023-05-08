import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Customer from "@models/Customer";
import { CreditCard, LocationOn } from "@mui/icons-material";

interface IShippingProgressProps { 
    customer : Customer;
    deliveryMethod: string;
}

const ShippingProgress = ( {customer, deliveryMethod} : IShippingProgressProps ) => {
    
    return (
        <Container>
            <Row className="ShippingProgressRow">
                <Col className="ShippingProgressBox" md={4}>
                    {/* Shipping Info & Method */}
                    <Col md={12}>
                        <LocationOn className="ShippingProgressBoxIcons" />
                    </Col>
                    <Col md={12}>
                        <h3>Shipping</h3>
                        <Container>
                            <Row><b>{`${customer.firstName ? customer.firstName : ""} ${customer.lastName ? customer.lastName : ""}`}</b></Row>
                            <Row>{`${customer.address}`}</Row>
                            <Row>{`${customer.zipCode} ${customer.city}`}</Row>
                            <Row>{`${customer.country}`}</Row>
                            <Row>{`${customer.countryCode}${customer.phone}`}</Row>
                            <Row>Delivery Method: {deliveryMethod}</Row>
                        </Container>
                    </Col>

                </Col>
                <Col className="ShippingProgressBox" md={4}>
                    {/* Recipient Info */}
                    <Col md={12}>
                        <CreditCard className="ShippingProgressBoxIcons" />
                    </Col>
                    <Col md={12}>
                        <h3>Billing Details</h3>
                        <Container>
                            <Row><b>{`${customer.firstName ? customer.firstName : ""} ${customer.lastName ? customer.lastName : ""}`}</b></Row>
                            <Row>{`${customer.address}`}</Row>
                            <Row>{`${customer.zipCode} ${customer.city}`}</Row>
                            <Row>{`${customer.country}`}</Row>
                            <Row>{`${customer.countryCode}${customer.phone}`}</Row>
                        </Container>
                    </Col>
                </Col>
                <Col className="ShippingProgressBox" md={4}>
                    {/* Shipping Status */}
                    <Col md={12}>
                        <LocalShippingIcon className="ShippingProgressBoxIcons" />
                    </Col>
                    <Col md={12}>
                        <h3>Shipping Method</h3>
                        <Container>
                            <Row>Fortrukket Leveringsmetode</Row>
                            <Row>{deliveryMethod}</Row>
                            <Row>(Normal leveringstid er 4-5 hverdage)</Row>
                        </Container>
                    </Col>
                </Col>
            </Row>
            <Row className="ShippingProgressRow">
                <ProgressBar className="ShippingProgressBar" animated striped variant="warning" now={33} />
            </Row>
        </Container>
    )
}

export default ShippingProgress;
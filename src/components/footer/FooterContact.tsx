import { Constants } from "@utils/Constants";
import { Container } from "react-bootstrap";

const FooterContact = () => {

    return (
        <Container className="ContactInfo">
            <h3>{Constants.companyName}</h3>
            <div className="contact-info">
                <p>{Constants.companyAdress}</p>
            </div>
        </Container>
    )
}

export default FooterContact;
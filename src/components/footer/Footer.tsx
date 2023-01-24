import { Col, Container, Row } from "react-bootstrap";
import { Instagram, Facebook, CodeSlash } from "react-bootstrap-icons";
import { footerBody, footerIcons, footerStyle, h3Style, socialIcons, textStyle } from "../FooterStyles";


export interface IFooterProps {
    companyName: string;
    companyUrl: string;
    instagramUrl: string;
    facebookUrl: string;
    telephoneNumber: string;
    backgroundColor: string;
    textColor: string;
}

const Footer: React.FC<IFooterProps> = function Footer(props: IFooterProps) {

    let date = new Date();
    let year = date.getFullYear();


    return (
        <Container style={footerStyle}>
            <Row>
                <Col md="4" className="footer-copywright">

                </Col>
                <Col md="4" className="footer-copywright">
                    <h3 style={h3Style}>Copyright © {year}</h3>
                </Col>
                <Col md="4" style={footerBody}>
                    <ul style={footerIcons}>

                        <li style={socialIcons}>
                            <a
                                href={props.companyUrl}
                                style={textStyle}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CodeSlash size={24} />
                            </a>
                        </li>

                        <li style={socialIcons}>
                            <a
                                href={props.instagramUrl}
                                style={textStyle}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram size={24} />
                            </a>
                        </li>
                        <li style={socialIcons}>
                            <a
                                href={props.facebookUrl}
                                style={textStyle}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook size={24} />
                            </a>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );

}

export default Footer;
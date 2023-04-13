import "./footer.scss";
import React from "react";
import { observer } from "mobx-react-lite";
import { Container } from "react-bootstrap";
import FooterIcons from "./FooterIcons";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";

const Footer: React.FC = observer(function Footer() {

  let year = new Date().getFullYear();

  return (
      <Container className="footer" fluid>
          <FooterContact />          
          <FooterLinks />
          <FooterIcons />
          <p style={{ color: "#FFF" }} className="footer-company-name">© {year}</p>
      </Container>
  )
})

export default Footer;
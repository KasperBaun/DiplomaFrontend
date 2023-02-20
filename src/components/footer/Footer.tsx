import { EnvelopeFill, Facebook, Instagram, TelephoneFill } from "react-bootstrap-icons";
import { Constants } from "@utils/Constants";
import "./footer.scss";

const Footer: React.FC = function Footer() {

  let year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <h3>Grønlund&<span>Lefort</span></h3>
          <div className="contact-info">
            <p>Gl. Kongevej 94a, st tv</p>
            <p>1850 Frederiksberg</p>
          </div>

          <p className="footer-links">
            <a href={Constants.companyUrl} className="link-1">Home</a>

            <a href={Constants.companyUrl}>Blog</a>

            <a href={Constants.companyUrl}>Pricing</a>

            <a href={Constants.companyUrl}>About</a>

            <a href={Constants.companyUrl}>Faq</a>

            <a href={Constants.companyUrl}>Contact</a>
          </p>

          <div className="footer-icons">

            <a href={Constants.facebookUrl} target="_blank" rel="noreferrer"> <Facebook size={20} /> </a>
            <a href={Constants.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            <a href={`tel: ${Constants.companyTelephoneNumber}`} ><TelephoneFill size={20} /></a>
            <a href={`mailto:${Constants.companyEmail}`} > <EnvelopeFill size={24} /> </a>

          </div>
          <p className="footer-company-name">© {year}</p>

        </div>

      </footer></>
  )
}

export default Footer;
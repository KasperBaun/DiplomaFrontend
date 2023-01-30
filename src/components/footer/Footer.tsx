import { EnvelopeFill, Facebook, Instagram, TelephoneFill } from "react-bootstrap-icons";
import { EnvironmentKeys } from "../../utils/EnvironmentKeys";
import "./footer.scss";

const Footer: React.FC = function Footer() {

  let year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <h3>Grønlund&<span>Lefort</span></h3>
          <div className="contact-info">
            <p>Gl. Kongevej 94a st tv</p>
            <p>1850 Frederiksberg</p>
          </div>

          <p className="footer-links">
            <a href={EnvironmentKeys.companyUrl} className="link-1">Home</a>

            <a href={EnvironmentKeys.companyUrl}>Blog</a>

            <a href={EnvironmentKeys.companyUrl}>Pricing</a>

            <a href={EnvironmentKeys.companyUrl}>About</a>

            <a href={EnvironmentKeys.companyUrl}>Faq</a>

            <a href={EnvironmentKeys.companyUrl}>Contact</a>
          </p>

          <div className="footer-icons">

            <a href={EnvironmentKeys.facebookUrl} target="_blank" rel="noreferrer"> <Facebook size={20} /> </a>
            <a href={EnvironmentKeys.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            <a href={`tel: ${EnvironmentKeys.companyTelephoneNumber}`} ><TelephoneFill size={20} /></a>
            <a href={`mailto:${EnvironmentKeys.companyEmail}`} > <EnvelopeFill size={24} /> </a>

          </div>
          <p className="footer-company-name">© {year}</p>

        </div>

      </footer></>
  )
}

export default Footer;
import { EnvelopeFill, Facebook, Instagram, TelephoneFill } from "react-bootstrap-icons";
import { Constants } from "@utils/Constants";
import "./footer.scss";
import React, { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";

const Footer: React.FC = observer(function Footer() {

  let year = new Date().getFullYear();

  const {languageStore} = useContext(MobXContext);

  return (
    <>
      <footer className="footer">
        <div className="footer-container">

          <h3>{Constants.companyName}</h3>
          <div className="contact-info">
            <p>{Constants.companyAdress}</p>
          </div>

          <p className="footer-links">
            <a href={Constants.companyUrl} className="link-1">{languageStore.currentLanguage.HomeTabText}</a>

            <a href={Constants.companyUrl}>{languageStore.currentLanguage.BlogTabText}</a>

            <a href={Constants.companyUrl}>{languageStore.currentLanguage.PricingTabText}</a>

            <a href={Constants.companyUrl}>{languageStore.currentLanguage.AboutUsTabText}</a>

            <a href={Constants.companyUrl}>{languageStore.currentLanguage.FAQTabText}</a>

            <a href={Constants.companyUrl}>{languageStore.currentLanguage.ContactTabText}</a>
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
})

export default Footer;
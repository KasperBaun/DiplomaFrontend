import { Constants } from "@utils/Constants";
import { EnvelopeFill, Facebook, Instagram, TelephoneFill } from "react-bootstrap-icons";
const FooterIcons = () => {
    return (
        <div className="footer-icons">

            <a href={Constants.facebookUrl} target="_blank" rel="noreferrer"> <Facebook size={20} /> </a>
            <a href={Constants.instagramUrl} target="_blank" rel="noreferrer"><Instagram size={20} /></a>
            <a href={`tel: ${Constants.companyTelephoneNumber}`} ><TelephoneFill size={20} /></a>
            <a href={`mailto:${Constants.companyEmail}`} > <EnvelopeFill size={24} /> </a>
        </div>
    )
}

export default FooterIcons;
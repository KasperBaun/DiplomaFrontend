import { Nav } from "react-bootstrap"
import { Constants } from "@utils/Constants";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";

const FooterLinks = () => {
    const {languageStore} = useContext(MobXContext);
    return (
        <Nav className="footerLinks" defaultActiveKey={Constants.companyUrl} as="ul">
            <Nav.Item as="li">
              <Nav.Link className="FL_NavLink" href={"/"}>{languageStore.currentLanguage.HomeTabText}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="FL_NavLink" href={"/aboutUs"}>{languageStore.currentLanguage.FAQTabText}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="FL_NavLink" href={"/aboutUs"}>{languageStore.currentLanguage.AboutUsTabText}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link className="FL_NavLink" href={Constants.companyUrl}>{languageStore.currentLanguage.OldPageText}</Nav.Link>
            </Nav.Item>
          </Nav>
    )
}

export default FooterLinks;
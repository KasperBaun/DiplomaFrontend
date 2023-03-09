import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { Container, Nav } from "react-bootstrap";

interface vertNavProps {
    setNavKey: Dispatch<SetStateAction<number>>;
}

const VertNavBackOffice = (props: vertNavProps) => {

    const { languageStore } = useContext(MobXContext);

    return (
        <Container className="VertNavContainer">
            <Nav defaultActiveKey="/backoffice" className="flex-column VertNav">
                <NavTitleDivider title={languageStore.currentLanguage.GeneralHeaderAdmin} />
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>{languageStore.currentLanguage.BackOfficeTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>{languageStore.currentLanguage.AnalyticsTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>{languageStore.currentLanguage.SalesTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>{languageStore.currentLanguage.InventoryTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>{languageStore.currentLanguage.ProductSniperTabText}</Nav.Link>
                <NavTitleDivider title={languageStore.currentLanguage.ManagementTabText} />
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(1)}>{languageStore.currentLanguage.CategoriesTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(2)}>{languageStore.currentLanguage.SubCategoriesTabText}</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(3)}>{languageStore.currentLanguage.ProductTabText}</Nav.Link>
            </Nav>
        </Container>
    )
}

interface props {
    title: string;
}
const NavTitleDivider = (props: props) => {
    return (
        <>
            <Nav.Item className="VertNavItem"><i className="VertNavTitle">{props.title}</i></Nav.Item>
            <hr className="NavTitleDividerHR" />
        </>
    )
}

export default VertNavBackOffice;
import { Dispatch, SetStateAction } from "react";
import { Container, Nav } from "react-bootstrap";

interface vertNavProps {
    setNavKey : Dispatch<SetStateAction<number>>;
}

const VertNavBackOffice = (props : vertNavProps) => {
    return (
        <Container className="VertNavContainer">
            <Nav defaultActiveKey="/backoffice" className="flex-column VertNav">
                <NavTitleDivider title="General" />
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>Backoffice</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>Analytics</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>Sales</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>Inventory</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(0)}>Product Sniper</Nav.Link>
                <NavTitleDivider title="Management" />
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(1)}>Category</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(1)}>Subcategory</Nav.Link>
                <Nav.Link className="NavLinkText" onClick={() => props.setNavKey(1)}>Product</Nav.Link>
            </Nav>
        </Container>
    )
}

interface props {
    title : string;
}
const NavTitleDivider = (props : props) => {
    return (
        <>
            <Nav.Item className="VertNavItem"><i className="VertNavTitle">{props.title}</i></Nav.Item>
            <hr className="NavTitleDividerHR" />
        </>
    )
}

export default VertNavBackOffice;
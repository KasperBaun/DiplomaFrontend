import { Dispatch, SetStateAction } from "react";
import { Container, Nav } from "react-bootstrap";

interface vertNavProps {
    setNavKey : Dispatch<SetStateAction<number>>;
}

const VertNavBackOffice = (props : vertNavProps) => {
    return (
        <Container className="VertNav">
            <Nav defaultActiveKey="/backoffice" className="flex-column">
                <NavTitleDivider title="General" />
                <Nav.Link onClick={() => props.setNavKey(0)}>Home</Nav.Link>
                <Nav.Link onClick={() => props.setNavKey(1)}>Categories</Nav.Link>
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
            <hr />
        </>
    )
}

export default VertNavBackOffice;
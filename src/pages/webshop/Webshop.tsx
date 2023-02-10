import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

interface WebshopProps {

}

const Webshop: FunctionComponent<WebshopProps> = () => {
    return (
        <Container style={{display: 'flex', justifyContent: 'center', height:'100%', width:'100%', marginTop: 'auto'}}>
            <Outlet />
        </Container>
    );
}

export default Webshop;
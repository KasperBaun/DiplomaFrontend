import CartDrawer from "@components/CartDrawer";
import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import { FunctionComponent } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

interface WebshopProps {

}

const Webshop: FunctionComponent<WebshopProps> = () => {
    return (
        <div>
            <Header />
            <Container style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', marginTop: 'auto' }}>
                <Outlet />
            </Container>            
            <CartDrawer/>
            <Footer />
        </div>
    );
}

export default Webshop;
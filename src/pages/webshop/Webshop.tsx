import Footer from "@components/footer/Footer";
import Header from "@components/header/Header";
import Loading from "@components/loading/Loading";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { FunctionComponent, useContext } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

interface WebshopProps {

}

const Webshop: FunctionComponent<WebshopProps> = observer(function Webshop() {

    const { rootStore } = useContext<IMobXContext>(MobXContext);

    if (!rootStore.isLoaded) {
        return (
            <Loading
                size={100}
                color={Constants.primaryColor}
            />
        )
    } else {
        return (
            <div>
                <Header />
                <Container style={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', marginTop: 'auto' }}>
                    <Outlet />
                </Container>
                <Footer />
            </div>
        );
    }
});

export default Webshop;
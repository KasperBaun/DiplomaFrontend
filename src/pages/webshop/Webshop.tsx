import { Footer } from "@components/footer/Footer";
import Header from "@components/header/Header";
import Loading from "@components/loading/Loading";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Webshop: React.FC = observer(function Webshop() {

    const { webshopStore, rootStore } = useContext<IMobXContext>(MobXContext);

    useEffect(() => {
        const webshopStoreLoaded = async () => {
            if (!rootStore.isWebshopLoaded && !rootStore.isWebshopLoading) {
                await rootStore.loadWebShop();
            }
        }
        webshopStoreLoaded();
    });

    if (!webshopStore.isLoaded) {
        return (
            <Loading
                size={50}
                color={Constants.primaryColor}
                loadingText="Loading..."
            />
        )
    } else {
        return (
            <div>
                <Header />
                <Container style={{  display: 'flex' }}>
                    <Outlet />
                </Container>
                <Footer />
            </div>
        );
    }
});

export default Webshop;
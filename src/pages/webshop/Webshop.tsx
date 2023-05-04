import { Footer } from "@components/footer/Footer";
import Header from "@components/header/Header";
import Loading from "@components/loading/Loading";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const Webshop: React.FC = observer(function Webshop() {

    const { rootStore } = useContext<IMobXContext>(MobXContext);

    if (!rootStore.isLoaded) {
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
                <Container style={{ minHeight: "80vh", display: 'flex', justifyContent: 'center', height: '100%', width: '100%', marginTop: 'auto' }}>
                    <Outlet />
                </Container>
                <Footer />
            </div>
        );
    }
});

export default Webshop;
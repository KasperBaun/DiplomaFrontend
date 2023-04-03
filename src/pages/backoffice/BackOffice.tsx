
import { Col, Container, Row } from 'react-bootstrap';
import VertNavBackOffice from './navigationbars/VerticalNavigationBO';
import "./css/backoffice.scss"
import BOCategories from "@backoffice/category/Categories"
import BackOfficeDashboard from './Dashboard/dashboard';
import { useContext, useState } from 'react';
import Subcategories from './subcategory/Subcategory';
import Products from './product/Products';
import SniperPage from './sniper/SniperPage';
import MobXContext from '@stores/MobXContext';
import { observer } from 'mobx-react-lite';
import AuthPage from './auth/AuthPage';
import Navbar from './navigationbars/Navbar';

const BackOfficeMain = observer(() => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const { authStore } = useContext(MobXContext);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<BOCategories />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
            case 4: return (<SniperPage />)
        }
    }

    if (!authStore.userAuthenticated) {
        return <AuthPage />;
    }
    else if (authStore.authState.user.role === "SuperAdmin" || "Admin") {
        return (
            <Container className="BackOfficeMain" fluid>
                <Row>
                    <Col md="2">
                        {/* <VertNavBackOffice setNavKey={setActiveNavKey} /> */}
                        <Navbar setNavKey={setActiveNavKey} />
                    </Col>
                    <Col>
                        {navSwitch()}
                    </Col>
                </Row>
            </Container>
        )
    }
    else if (authStore.authState.user.role === "User" || "Guest") {
        return (
            <Container>
                <img width="600" src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg" />
            </Container>
        )
    }

});

export default BackOfficeMain;
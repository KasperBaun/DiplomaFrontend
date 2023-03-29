
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
import LoginPage from './login/LoginPage';
import SignUpPage from './login/SignUpPage';

export interface ILoginData {
    email: string;
    password: string;
}

const BackOfficeMain = observer(() => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const [activeAuthNavKey, setActiveAuthNavKey] = useState<number>(0);
    const { authStore } = useContext(MobXContext);

    async function handleLoginClicked(data: ILoginData): Promise<void> {
        async function delayTwoSeconds(): Promise<void> {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await delayTwoSeconds();
        if (data.email === "test@example.com" && data.password === "test-password") {
            authStore.setUserAuthenticated(true);
        }
    }

    function handleAuthNav(key: number): void {
        setActiveAuthNavKey(key);
    }

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<BOCategories />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
            case 4: return (<SniperPage />)
        }
    }

    const authNavSwitch = () => {
        switch (activeAuthNavKey) {
            case 0: return (<LoginPage onLoginClicked={handleLoginClicked} onAuthNavClicked={handleAuthNav} />);
            case 1: return (<></>);
            case 2: return (<SignUpPage onAuthNavClicked={handleAuthNav} />);
        }
    }

    if (!authStore.userAuthenticated) {
        return authNavSwitch();
    }
    else {
        return (
            <Container className="BackOfficeMain" fluid>
                <Row>
                    <Col md="2">
                        <VertNavBackOffice setNavKey={setActiveNavKey} />
                    </Col>
                    <Col>
                        {navSwitch()}
                    </Col>
                </Row>
            </Container>
        )
    }
});

export default BackOfficeMain;
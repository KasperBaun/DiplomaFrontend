
import { Col, Container, Row } from 'react-bootstrap';
import VertNavBackOffice from './navigationbars/VerticalNavigationBO';
import "./css/backoffice.scss"
import BOCategories from "@backoffice/category/Categories"
import BackOfficeDashboard from './Dashboard/dashboard';
import { useContext, useEffect, useState } from 'react';
import Subcategories from './subcategory/Subcategory';
import Products from './product/Products';
import SniperPage from './sniper/SniperPage';
import MobXContext from '@stores/MobXContext';
import Loading from '@components/loading/Loading';
import { observer } from 'mobx-react-lite';
import LoginPage from './login/LoginPage';
import { Constants } from '@utils/Constants';

export interface ILoginData {
    email: string;
    password: string;
}

const BackOfficeMain = observer(() => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const { backofficeStore, languageStore } = useContext(MobXContext);
    const [authorized, setAuthorized] = useState<boolean>(false);


    useEffect(() => {
        const loadBackofficeStore = async () => {
            await backofficeStore.init();
        }
        loadBackofficeStore();
    }, [])

    function handleLoginClicked(data: ILoginData): void {
        if (data.email === "test@example.com" && data.password === "test-password") {
            setAuthorized(true);
        }
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

    if (!backofficeStore.isLoaded) {
        return (
            <Loading />
        )
    }
    else if (!authorized) {
        return (
            <LoginPage
                companyName={Constants.companyName}
                companyUrl={Constants.companyUrl}
                defaultEmailText="test@example.com"
                defaultPasswordText="test-password"
                signInText={languageStore.currentLanguage.signInText}
                forgotPasswordText={languageStore.currentLanguage.forgotPasswordText}
                dontHaveAccountText={languageStore.currentLanguage.dontHaveAccountText}
                onLoginClicked={handleLoginClicked}
            />
        )
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
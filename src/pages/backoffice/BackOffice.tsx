
import { Col, Container, Row } from 'react-bootstrap';
import VertNavBackOffice from './navigationbars/VerticalNavigationBO';
import "./css/backoffice.scss"
import BOCategories from "@backoffice/category/Categories"
import BackOfficeDashboard from './Dashboard/dashboard';
import { useState } from 'react';
import Subcategories from './subcategory/Subcategory';
import Products from './product/Products';
import SniperPage from './sniper/SniperPage';

const BackOfficeMain = () => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<BOCategories />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
            case 4: return (<SniperPage />)
        }
    }

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

export default BackOfficeMain;
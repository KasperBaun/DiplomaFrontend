
import { Col, Container, Row } from 'react-bootstrap';
import VertNavBackOffice from './category/navigationbars/VerticalNavigationBO';
import "./css/backoffice.scss"
import BOCategories from "@backoffice/category/Categories"
import BackOfficeDashboard from './Dashboard/dashboard';
import { useState } from 'react';
import Subcategories from './subcategory/Subcategory';
import BO_Products from './product/BO_Products';

const BackOfficeMain = () => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<BOCategories />)
            case 2: return (<Subcategories />)
            case 3: return (<BO_Products />)
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

import { Col, Container, Row } from 'react-bootstrap';
import VertNavBackOffice from './navigationbars/VerticalNavigationBO';
import "./css/backoffice.scss"
import BOCategories from "@backoffice/category/Categories"
import BackOfficeDashboard from './Dashboard/dashboard';
import { useContext, useEffect, useState } from 'react';
import Subcategories from './subcategory/Subcategory';
import Products from './product/Products';
import MobXContext from '@stores/MobXContext';
import Loading from '@components/loading/Loading';
import { observer } from 'mobx-react-lite';

const BackOfficeMain = observer(() => {
    const [activeNavKey, setActiveNavKey] = useState<number>(0);
    const { backofficeStore } = useContext(MobXContext);

    useEffect(() => {
        const loadBackofficeStore = async () => {
            await backofficeStore.init();
        }
        loadBackofficeStore();
    }, [])

    const navSwitch = () => {
        switch (activeNavKey) {
            case 0: return (<BackOfficeDashboard />)
            case 1: return (<BOCategories />)
            case 2: return (<Subcategories />)
            case 3: return (<Products />)
        }
    }

    if (!backofficeStore.isLoaded) {
        return (
            <Loading />
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
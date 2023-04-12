import { Container } from "@mui/material";
import RecentSalesList from "./components/RecentSales";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";

const OrderList = () => {
    
    const { languageStore } = useContext(MobXContext);

    return (
        <Container maxWidth="xl" className="DashBoardContainer">
            <Row>
                <RecentSalesList
                    title={languageStore.currentLanguage.RecentSalesWidgetTitle}
                    datePaid={languageStore.currentLanguage.RecentSalesDatePaid}
                    approved={languageStore.currentLanguage.RecentSalesApproved}
                    amount={languageStore.currentLanguage.RecentSalesAmount}
                    tableButton={languageStore.currentLanguage.RecentSalesNavButton}
                    currencyId={languageStore.currentLanguage.RecentSalesCurrencyId}
                    method={languageStore.currentLanguage.RecentSalesMethod}
                    tableHeight={750}
                />
            </Row>
        </Container>
    )
}

export default observer(OrderList);
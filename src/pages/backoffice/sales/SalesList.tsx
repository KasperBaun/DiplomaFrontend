import { Container, Grid } from "@mui/material";
import RecentSalesList from "./components/RecentSales";
import { useContext } from "react";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";

const OrderList = () => {
    
    const { languageStore } = useContext(MobXContext);

    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={11.9}>
                <div className="DashBoardGridContainer">
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
                </div>
            </Grid>
        </Grid>
    )
}

export default observer(OrderList);
import { Container, Grid } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import EconomyWidget from "./components/EconomyWidget";
import RecentSalesList from "./components/RecentSales";
import "./css/dashboard.scss";

const BackOfficeDashboard = () => {
    const { languageStore } = useContext(MobXContext);

    return (
            <Grid container spacing={2}>
                <Grid className="DashBoardGridContainer" item xs={12}>
                    <EconomyWidget title={languageStore.currentLanguage.EconomyWidgetTitle} salgsformat={languageStore.currentLanguage.EconomyWidgetSalesFormat}/>
                </Grid>
                <Grid className="DashBoardGridContainer" item xs={12}>
                    <Container  maxWidth="xl" className="DashBoardContainer">
                        <RecentSalesList 
                            title={languageStore.currentLanguage.RecentSalesWidgetTitle} 
                            datePaid={languageStore.currentLanguage.RecentSalesDatePaid}
                            approved={languageStore.currentLanguage.RecentSalesApproved}
                            amount={languageStore.currentLanguage.RecentSalesAmount}
                            tableButton={languageStore.currentLanguage.RecentSalesNavButton}
                            currencyId={languageStore.currentLanguage.RecentSalesCurrencyId}
                            method={languageStore.currentLanguage.RecentSalesMethod}
                        />
                    </Container>
                </Grid>
                
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Salg Total</h3>
                    </Container>
                </Grid>
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Køb Total</h3>
                    </Container>
                </Grid>
                <Grid className="DashBoardGridContainer" item xs>
                    <Container className="DashBoardContainer">
                        <h3>Inventar</h3>
                    </Container>
                </Grid>
            </Grid>
    )
}

export default BackOfficeDashboard;
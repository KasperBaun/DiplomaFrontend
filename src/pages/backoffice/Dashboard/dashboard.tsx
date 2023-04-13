import { Container, Grid, Link } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import "./css/dashboard.scss";
import EconomyWidget from "./components/EconomyWidget";
import RecentSalesList from "@backoffice/orders/components/RecentSales";
import SalesSummary from "./components/SalesSummary";
import InventoryWidget from "./components/InventoryWidget";

const Dashboard = () => {
    const { languageStore } = useContext(MobXContext);

    const navigateToSales = () => {

    }

    return (
        <Grid container spacing={2}>
            <Grid className="DashBoardGridContainer" item xs={12}>
                <EconomyWidget title={languageStore.currentLanguage.EconomyWidgetTitle} salgsformat={languageStore.currentLanguage.EconomyWidgetSalesFormat} />
            </Grid>
            <Grid className="DashBoardGridContainer" item xs={12}>
                <Container maxWidth="xl" className="DashBoardContainer">
                    <RecentSalesList
                        title={languageStore.currentLanguage.RecentSalesWidgetTitle}
                        datePaid={languageStore.currentLanguage.RecentSalesDatePaid}
                        approved={languageStore.currentLanguage.RecentSalesApproved}
                        amount={languageStore.currentLanguage.RecentSalesAmount}
                        tableButton={languageStore.currentLanguage.RecentSalesNavButton}
                        currencyId={languageStore.currentLanguage.RecentSalesCurrencyId}
                        method={languageStore.currentLanguage.RecentSalesMethod}
                        tableHeight={225}
                    />
                    <Link color="primary" href="#" onClick={navigateToSales} sx={{ mt: 3}}>
                        { languageStore.currentLanguage.GoToSales }
                    </Link>
                </Container>
            </Grid>

            <Grid className="DashBoardGridContainer" item xs>
                <Container className="DashBoardContainer">
                    <SalesSummary />
                </Container>
            </Grid>
            <Grid className="DashBoardGridContainer" item xs>
                <Container className="DashBoardContainer">
                    <InventoryWidget />
                </Container>
            </Grid>
        </Grid>
    )
}

export default Dashboard;
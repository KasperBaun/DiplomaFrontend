import { Container, Grid, Link } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import "./css/dashboard.scss";
import EconomyWidget from "./components/EconomyWidget";
import RecentSalesList from "@backoffice/sales/components/RecentSales";
import SalesSummary from "./components/SalesSummary";
import InventoryWidget from "./components/InventoryWidget";
import OrderDetailsList from "@backoffice/orders/components/OrderDetailsList";

const Dashboard = () => {
    const { languageStore } = useContext(MobXContext);

    const navigateToSales = () => {

    }
    const navigateToOrders = () => {

    }

    return (
        <Grid container rowGap={2} columnGap={2} justifyContent={"center"}>
            <Grid item xs={12} md={5.9}>
                <div className="DashBoardGridContainer">
                <OrderDetailsList origin="MainPage" tableHeight={450} />
                    <Link color="primary" href="#" onClick={navigateToOrders} sx={{ mt: 3 }}>
                        {languageStore.currentLanguage.GoToOrders}
                    </Link>
                </div>
            </Grid>
            <Grid item xs={12} md={5.9}>
                <div className="DashBoardGridContainer">
                    <RecentSalesList
                        title={languageStore.currentLanguage.RecentSalesWidgetTitle}
                        datePaid={languageStore.currentLanguage.RecentSalesDatePaid}
                        approved={languageStore.currentLanguage.RecentSalesApproved}
                        amount={languageStore.currentLanguage.RecentSalesAmount}
                        tableButton={languageStore.currentLanguage.RecentSalesNavButton}
                        currencyId={languageStore.currentLanguage.RecentSalesCurrencyId}
                        method={languageStore.currentLanguage.RecentSalesMethod}
                        tableHeight={450}
                    />
                    <Link color="primary" href="#" onClick={navigateToSales} sx={{ mt: 3 }}>
                        {languageStore.currentLanguage.GoToSales}
                    </Link>
                </div>
            </Grid>
            <Grid item xs={12} md={5.9}>
                <div className="DashBoardGridContainer">
                    <InventoryWidget />
                </div>
            </Grid>
            <Grid item xs={12} md={5.9}>
                <div className="DashBoardGridContainer">
                    <SalesSummary />
                </div>
            </Grid>
        </Grid>
    )
}

export default Dashboard;
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
                            tableDate={languageStore.currentLanguage.RecentSalesTableDate}
                            tableName={languageStore.currentLanguage.RecentSalesTableName}
                            tableLoc={languageStore.currentLanguage.RecentSalesTableShipmentLoc}
                            tablePay={languageStore.currentLanguage.RecentSalesTablePaymentMethod}
                            tableSaleAmount={languageStore.currentLanguage.RecentSalesTableSalePrice}
                            tableButton={languageStore.currentLanguage.RecentSalesNavButton}
                            currencyId={languageStore.currentLanguage.RecentSalesCurrencyId}
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
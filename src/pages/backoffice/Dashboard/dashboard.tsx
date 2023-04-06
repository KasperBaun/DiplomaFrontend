import { Box } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import "./css/dashboard.scss";
import BackofficeHeader from "./components/BackofficeHeader";

const Dashboard = () => {
    const { languageStore } = useContext(MobXContext);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <BackofficeHeader title={"Dashboard"} subtitle={"Welcome to your dashboard"} />
            </Box>
        </Box>
    )
}

export default Dashboard;


{/* <Grid container spacing={2}>
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
        </Grid> */}
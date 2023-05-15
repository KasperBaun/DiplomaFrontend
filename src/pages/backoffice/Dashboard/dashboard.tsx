import { Box, Grid, Link, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import "./css/dashboard.scss";
import { RecentSalesList } from "@backoffice/sales/components/RecentSales";
import { observer } from "mobx-react-lite";
import Loading from "@components/loading/Loading";
import { LineChart } from "./components/LineChart";
import { RevenueInfoBox } from "./components/RevenueInfoBox";
import { StorageValueInfoBox } from "./components/StorageValueInfoBox";
import { ResultsInfoBox } from "./components/ResultsInfoBox";

export const Dashboard = observer(() => {
    const { languageStore, backofficeStore } = useContext(MobXContext);

    const informationItemStyling: React.CSSProperties = {
        minHeight: "20vh",
        minWidth: "20vh",
        borderRadius: "10px",
        padding: '10px',
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        display: 'flex',
    };

    const navigateToSales = () => {

    }
    const navigateToOrders = () => {

    }

    if (!backofficeStore.isLoaded) {
        return <Loading color={"primary"} />;
    } else {

        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const revenueCurrentMonth = backofficeStore.getRevenueChartData(currentYear)[currentMonth - 1].y;
        console.log(currentMonth, revenueCurrentMonth)

        return (
            <>
                <Grid container sx={{ margin: 0, padding: 0, width: '100%' }} justifyContent={"space-between"} flexDirection={'row'} spacing={1} >
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box sx={informationItemStyling}>
                            <RevenueInfoBox />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                        <Box sx={informationItemStyling} >
                            <StorageValueInfoBox />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Box sx={informationItemStyling} >
                            <ResultsInfoBox />
                        </Box>
                    </Grid>
                </Grid>


                <Grid container sx={{ margin: 0, padding: 0 }} justifyContent={"space-between"} flexDirection={'row'} spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                        <Typography variant="h3" color="primary" sx={{ mb: 3 }} >{languageStore.currentLanguage.revenue}</Typography>
                        <LineChart />
                        {/* <div className="DashBoardGridContainer">
                        <OrderDetailsList origin="MainPage" tableHeight={450} />
                        <Link color="primary" href="#" onClick={navigateToOrders} sx={{ mt: 3 }}>
                            {languageStore.currentLanguage.GoToOrders}
                        </Link>
                    </div> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                        <RecentSalesList displayNumberOfItems={20} />
                        <Link color="primary" href="#" onClick={navigateToSales} sx={{ mt: 3 }}>
                            {languageStore.currentLanguage.GoToSales}
                        </Link>
                    </Grid>
                    {/* <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <InventoryWidget />
                    </Grid>
                    <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <SalesSummaries />
                    </Grid> */}
                </Grid >
            </>
        )
    }
});

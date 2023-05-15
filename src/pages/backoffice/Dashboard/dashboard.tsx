import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import "./css/dashboard.scss";
import { RecentSalesList } from "@backoffice/sales/components/RecentSales";
import { SalesSummaries } from "./components/SalesSummary";
import InventoryWidget from "./components/InventoryWidget";
import { observer } from "mobx-react-lite";
import Loading from "@components/loading/Loading";
import { LineChart } from "./components/LineChart";
import { Constants } from "@utils/Constants";

export const Dashboard = observer(() => {
    const { languageStore, backofficeStore } = useContext(MobXContext);

    const dashboardItemStyling: React.CSSProperties = {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "10px",

    }

    const informationItemStyling: React.CSSProperties = {
        minHeight: "20vh",
        height: '100%',
        borderRadius: "10px",
        padding: '5px',
        margin: '5px',
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",

        backgroundColor: Constants.primaryColor
    };

    const navigateToSales = () => {

    }
    const navigateToOrders = () => {

    }

    if (!backofficeStore.isLoaded) {
        return <Loading color={"primary"} />;
    } else {

        return (
            <>
                <Grid container sx={{ margin: 0, padding: 0 }} justifyContent={"space-between"} flexDirection={'row'} >
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={informationItemStyling} display={'flex'} justifyContent={'center'}>
                        <Box
                            sx={{

                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={informationItemStyling}>
                        <Box sx={{ backgroundColor: Constants.primaryColor, color: Constants.primaryColor }} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={informationItemStyling}>
                        <Box sx={{ color: Constants.primaryColor }} />
                    </Grid>
                </Grid>


                <Grid container sx={{ margin: 0, padding: 0 }} justifyContent={"space-between"} flexDirection={'row'} rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <Typography variant="h3" color="primary" sx={{ mb: 3 }} >{languageStore.currentLanguage.revenue}</Typography>
                        <LineChart />
                        {/* <div className="DashBoardGridContainer">
                        <OrderDetailsList origin="MainPage" tableHeight={450} />
                        <Link color="primary" href="#" onClick={navigateToOrders} sx={{ mt: 3 }}>
                            {languageStore.currentLanguage.GoToOrders}
                        </Link>
                    </div> */}
                    </Grid>
                    <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <RecentSalesList displayNumberOfItems={20} />
                        <Link color="primary" href="#" onClick={navigateToSales} sx={{ mt: 3 }}>
                            {languageStore.currentLanguage.GoToSales}
                        </Link>
                    </Grid>
                    <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <InventoryWidget />
                    </Grid>
                    <Grid item xs={12} md={3} sx={dashboardItemStyling}>
                        <SalesSummaries />
                    </Grid>
                </Grid >
            </>
        )
    }
});

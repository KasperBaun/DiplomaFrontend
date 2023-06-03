import MobXContext from "@stores/MobXContext";
import { Box, Button, FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { RecentSalesList } from "@backoffice/sales/components/RecentSales";
import { observer } from "mobx-react-lite";
import { RevenueInfoBox } from "./components/RevenueInfoBox";
import { NotificationInfoBox } from "./components/NotificationInfoBox";
import { ResultsInfoBox } from "./components/ResultsInfoBox";
import { KpiInfoBox } from "./components/KpiInfoBox";
import { EconomyWidget } from "./components/EconomyWidget";
import { ProductsTable } from "./components/ProductsTable";
import { Orders } from "@backoffice/orders/Orders";

type DashboardProps = {
    setNavKey: Dispatch<SetStateAction<number>>;
}

export const Dashboard: React.FC<DashboardProps> = observer((props: DashboardProps) => {
    const { languageStore, backofficeStore, sniperStore } = useContext(MobXContext);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    const navigateToSales = () => props.setNavKey(6);
    const navigateToOrders = () => props.setNavKey(7);

    const handleYearChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        setYear(event.target.value as number);
        return;
    };

    const handleOnClearAllClicked = () => {
        backofficeStore.clearAllNotifications();
    }

    const handleOnStartSniperClicked = () => {
        // Only 5 items since it takes 15-20 seconds for each..
        sniperStore.startSniper(backofficeStore.BestSellingProducts.slice(0, 5), props.setNavKey);
    }

    useEffect(() => {
        if (!sniperStore.isSniping) {
            handleOnStartSniperClicked();
        }
    }, [])

    const spacing = 2;
    const worstSellingProducts = backofficeStore.ProductItems.filter(p => p.sold === false).sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime()).slice(0, 20).map(p => p.product);

    return (
        <>
            <Grid container sx={containerStyling} spacing={spacing} >

                {/* First row with 3 information boxes - revenue, storagevalue, tbd */}
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box sx={informationItemStyling} >
                        <FormControl >
                            <InputLabel>{languageStore.currentLanguage.select + " " + languageStore.currentLanguage.year}</InputLabel>
                            <Select
                                label={languageStore.currentLanguage.select + " " + languageStore.currentLanguage.year}
                                value={year ? year : ''}
                                onChange={handleYearChange}
                                aria-label={languageStore.currentLanguage.select + languageStore.currentLanguage.year}>
                                {backofficeStore.getYearsAvailable().map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>



                <Grid item xs={12} sm={12} md={12} lg={4} xl={4} >
                    <Box sx={informationItemStyling} >
                        <Typography variant="h4" display='flex' justifyContent={'space-between'}>
                            {languageStore.currentLanguage.notifications}
                            {backofficeStore.Notifications.length > 0 &&
                                <Button variant="contained" onClick={handleOnClearAllClicked} sx={{ mt: 0, '&:hover': { cursor: 'pointer' } }}>
                                    {languageStore.currentLanguage.clearAll}
                                </Button>
                            }
                        </Typography>
                        <NotificationInfoBox />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                    <Box sx={informationItemStyling}>
                        <Typography variant="h4" > {languageStore.currentLanguage.revenue} </Typography>
                        <RevenueInfoBox year={year} />
                    </Box>
                </Grid>


            </Grid>


            {/* Second row with 2 charts containing revenue and expenses. And then results table*/}
            <Grid container sx={containerStyling} spacing={spacing}>

                <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4">{languageStore.currentLanguage.kpi}</Typography>
                        <KpiInfoBox year={year} />
                    </Box>
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}  >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4" >{languageStore.currentLanguage.results}</Typography>
                        <ResultsInfoBox year={year} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4">{languageStore.currentLanguage.revenue + " " + languageStore.currentLanguage.and.toLowerCase() + " " + languageStore.currentLanguage.expenses.toLowerCase()}</Typography>
                        <EconomyWidget year={year} />
                    </Box>
                </Grid>


            </Grid >


            {/* Third row with best selling products and the products that have been on the shelf the longest*/}
            <Grid container sx={containerStyling} spacing={spacing} >
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4" display='flex' justifyContent={'space-between'}>
                            {languageStore.currentLanguage.bestSellingProducts}
                            <Button variant="contained" disabled={sniperStore.isSniping} onClick={handleOnStartSniperClicked} sx={{ mt: 0, '&:hover': { cursor: 'pointer' } }}>
                                {languageStore.currentLanguage.startSniper}
                            </Button>
                        </Typography>
                        <ProductsTable products={backofficeStore.BestSellingProducts} />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4">{languageStore.currentLanguage.worstSellingProducts}</Typography>
                        <ProductsTable products={worstSellingProducts} />
                    </Box>
                </Grid>
            </Grid >

            {/* Fourth row with current state of the business orders and sales*/}
            <Grid container sx={containerStyling} spacing={spacing} style={{ marginBottom: 2 }} >
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4" display='flex' justifyContent={'space-between'}>
                            {languageStore.currentLanguage.OrderDetailsListTitle}
                            <Link color="primary" onClick={navigateToOrders} sx={{ mt: 0, '&:hover': { cursor: 'pointer' } }}>
                                {languageStore.currentLanguage.goToOrders}
                            </Link>
                        </Typography>
                        <Orders displayItemsAmount={20} />

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4" display='flex' justifyContent={'space-between'}>
                            {languageStore.currentLanguage.RecentSalesWidgetTitle}
                            <Link color="primary" onClick={navigateToSales} sx={{ mt: 0, '&:hover': { cursor: 'pointer' } }}>
                                {languageStore.currentLanguage.goToSales}
                            </Link>
                        </Typography>
                        <RecentSalesList displayNumberOfItems={20} />
                    </Box>
                </Grid>
            </Grid >
        </>
    )
});

const informationItemStyling: React.CSSProperties = {
    height: "20vh",
    minWidth: "20vh",
    borderRadius: "5px",
    padding: '10px',
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    display: 'flex',
    flexDirection: 'column'
};

const dashboardItemStyling: React.CSSProperties = {
    ...informationItemStyling,
    height: "50vh",
};

const containerStyling: React.CSSProperties = {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
};
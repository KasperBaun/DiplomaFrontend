import { Box, FormControl, Grid, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import "./css/dashboard.scss";
import { RecentSalesList } from "@backoffice/sales/components/RecentSales";
import { observer } from "mobx-react-lite";
import { LineChart } from "./components/LineChart";
import { RevenueInfoBox } from "./components/RevenueInfoBox";
import { StorageValueInfoBox } from "./components/StorageValueInfoBox";
import { ResultsInfoBox } from "./components/ResultsInfoBox";
import OrderDetailsList from "@backoffice/orders/components/OrderDetailsList";
import { ChartData } from "@models/ChartData";

export type DashboardProps = {
    setNavKey: Dispatch<SetStateAction<number>>;
}

export const Dashboard: React.FC<DashboardProps> = observer((props: DashboardProps) => {
    const { languageStore, backofficeStore } = useContext(MobXContext);
    const [year, setYear] = useState<number>(2023);
    const [data, setData] = useState<ChartData[]>(backofficeStore.getRevenueChartData(year));

    const navigateToSales = () => {
        props.setNavKey(6);
    }
    const navigateToOrders = () => {
        props.setNavKey(7);
    }


    const yearsAvailable = backofficeStore.getYearsAvailable();
    const handleYearChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        setData(backofficeStore.getRevenueChartData(event.target.value));
        setYear(event.target.value as number);
        return;
    };

    return (
        <>
            <Grid container sx={containerStyling} spacing={1} >
                <Grid item xs={12} >
                    <FormControl sx={{ minWidth: '25vw' }}>
                        <InputLabel>{languageStore.currentLanguage.select + " " + languageStore.currentLanguage.year}</InputLabel>
                        <Select
                            label={languageStore.currentLanguage.select + " " + languageStore.currentLanguage.year}
                            value={year ? year : ''}
                            onChange={handleYearChange}
                            aria-label={languageStore.currentLanguage.select + languageStore.currentLanguage.year}>
                            {yearsAvailable.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* First row with 3 information boxes - revenue, storagevalue, tbd */}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={informationItemStyling}>
                        <Typography variant="h4" > {languageStore.currentLanguage.revenue} </Typography>
                        <RevenueInfoBox year={year} />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                    <Box sx={informationItemStyling} >
                        <Typography variant="h4" > {languageStore.currentLanguage.inventoryValue} </Typography>
                        <StorageValueInfoBox />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Box sx={informationItemStyling} >
                        <Typography variant="h4" > {languageStore.currentLanguage.revenue} </Typography>
                        <RevenueInfoBox year={year} />
                    </Box>
                </Grid>
            </Grid>


            {/* Second row with 2 charts containing revenue and expenses. And then resultstable*/}
            <Grid container sx={containerStyling} spacing={1}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4">{languageStore.currentLanguage.revenue}</Typography>
                        {/* <LineChart data={data} /> */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4">{languageStore.currentLanguage.expenses}</Typography>
                        <LineChart
                            data={data}
                        // revenueData={data.map(d => { return { x: d.month, y: d.revenue } })} 
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} overflow={'auto'} >
                    <Box sx={dashboardItemStyling} >
                        <Typography variant="h4" >{languageStore.currentLanguage.results}</Typography>
                        <ResultsInfoBox year={year} />
                    </Box>
                </Grid>
            </Grid >


            {/* Third row with current state of the business orders and sales*/}
            <Grid container sx={containerStyling} spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} overflow={'auto'}>
                    <Typography variant="h4">{languageStore.currentLanguage.OrdersTabText}</Typography>
                    <div className="DashBoardGridContainer">
                        <OrderDetailsList origin="MainPage" tableHeight={450} />
                        <Link color="primary" href="#" onClick={navigateToOrders} sx={{ mt: 3 }}>
                            {languageStore.currentLanguage.GoToOrders}
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                    <RecentSalesList displayNumberOfItems={20} />
                    <Link color="primary" href="#" onClick={navigateToSales} sx={{ mt: 3 }}>
                        {languageStore.currentLanguage.GoToSales}
                    </Link>
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
    flexDirection: 'column',
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
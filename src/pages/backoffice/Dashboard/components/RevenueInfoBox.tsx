import { ArrowDownward, ArrowUpward, Paid } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { Constants } from "@utils/Constants";
import React, { useContext } from "react";

export const RevenueInfoBox = () => {

    const { languageStore, backofficeStore } = useContext(MobXContext);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const revenueCurrentMonth = backofficeStore.getRevenueChartData(currentYear)[currentMonth - 1].y;

    const lastMonth = currentMonth - 1;
    const revenueLastMonth = backofficeStore.getRevenueChartData(currentYear)[lastMonth - 1].y;

    const titleStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        borderRadius: '1rem',
        alignItems: 'self-end',

    };
    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',

    };

    const resultComponent = () => {
        if (revenueCurrentMonth > revenueLastMonth) {
            return <Typography variant="h5" sx={{ color: "primary" }} gutterBottom>
                <ArrowUpward sx={{ color: 'green' }} /> {revenueCurrentMonth - revenueLastMonth} {languageStore.currentLanguage.kroner} {languageStore.currentLanguage.more} {languageStore.currentLanguage.than} {languageStore.currentLanguage.last} {languageStore.currentLanguage.month}
            </Typography>
        } else {
            return <Typography variant="h5" sx={{ color: "primary" }} gutterBottom>
                <ArrowDownward sx={{ color: 'red' }} /> {revenueLastMonth - revenueCurrentMonth} {languageStore.currentLanguage.kroner} {languageStore.currentLanguage.less} {languageStore.currentLanguage.than} {languageStore.currentLanguage.last} {languageStore.currentLanguage.month}
            </Typography>
        }
    };

    return (
        <Grid container>
            <Grid item xs={12} sx={titleStyling} >
                <Paid sx={{ color: Constants.primaryColor }} />
                <Typography variant="h3" sx={{ color: "primary" }} gutterBottom>
                    {languageStore.currentLanguage.revenue}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={valueStyling}>
                <Typography variant="h3" sx={{ color: "primary" }} gutterBottom>
                    {revenueCurrentMonth} {languageStore.currentLanguage.kroner}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={valueStyling}>
                {resultComponent()}
            </Grid>
        </Grid>
    )
}
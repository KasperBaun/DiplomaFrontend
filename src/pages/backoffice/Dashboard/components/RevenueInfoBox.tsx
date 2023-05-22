import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { LanguageStore } from "@stores/LanguageStore";
import MobXContext from "@stores/MobXContext";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

export type RevenueInfoBoxProps = {
    year: number;
}

export const RevenueInfoBox: React.FC<RevenueInfoBoxProps> = observer(({ year }: RevenueInfoBoxProps) => {

    const { languageStore, backofficeStore } = useContext(MobXContext);
    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en-US" ? "en-US" : "da-DK";
    const currency = languageStore.currentLanguage.currency;

    const yearRevenue = backofficeStore.getChartData(year).map((item) => item.revenue).reduce((prev, next) => prev + next);
    const monthsCount = countMonthsPassed(year);
    const thanLastYear = languageStore.currentLanguage.than + " " + languageStore.currentLanguage.last + " " + languageStore.currentLanguage.year;
    let lastYearsRevenue = 0;
    const yearsAvailable = backofficeStore.getYearsAvailable();
    if (yearsAvailable.includes(year - 1)) {
        lastYearsRevenue = backofficeStore.getChartData(year - 1, monthsCount).map((item) => item.revenue).reduce((prev, next) => prev + next);
    }

    const monthRevenue = backofficeStore.getChartData(year)[new Date().getMonth()].revenue;

    return (
        <Grid item xs={12} sx={{
            display: 'flex',
            justifyContent: 'start',
            flexDirection: 'column'
        }}
        >
            <Typography variant="h6" >
                <b>{languageStore.currentLanguage.YTD}:</b> {ExtentionMethods.formatPrice(yearRevenue, currentLanguagecode, currency)}
            </Typography>
            {lastYearsRevenue > 0 &&
                <Typography variant="h6" >
                    {comparisonComponent(yearRevenue, lastYearsRevenue, thanLastYear.toLowerCase(), currentLanguagecode, currency, languageStore)}
                </Typography>
            }
            {year === new Date().getFullYear() &&
                <Typography variant="h6" >
                    <b>{languageStore.currentLanguage.month}:</b> {ExtentionMethods.formatPrice(monthRevenue, currentLanguagecode, currency)}
                </Typography>
            }
        </Grid >
    )
});


const comparisonComponent = (value1: number, value2: number, text: string, locale: string, currency: string, languageStore: LanguageStore) => {
    if (value1 > value2) {
        return <><ArrowUpward sx={{ color: 'green' }} /> {ExtentionMethods.formatPrice((value1 - value2), locale, currency)} {languageStore.currentLanguage.more.toLowerCase()} {text} </>
    } else {
        return <><ArrowDownward sx={{ color: 'red' }} /> {ExtentionMethods.formatPrice((value2 - value1), locale, currency)} {languageStore.currentLanguage.less.toLowerCase()} {text}</>
    }
};

function countMonthsPassed(year: number): number[] {
    const currentYear = new Date().getFullYear();
    const monthsArray = Array.from({ length: 12 }, (_, i) => i + 1);

    if (year === currentYear) {
        const currentMonth = new Date().getMonth();
        return monthsArray.slice(0, currentMonth + 1);
    }

    return monthsArray;
}

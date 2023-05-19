import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

export type KpiInfoBoxProps = {
    year: number;
}

export const KpiInfoBox: React.FC<KpiInfoBoxProps> = observer(({ year }: KpiInfoBoxProps) => {

    const { languageStore, backofficeStore } = useContext(MobXContext);

    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        borderRadius: '1rem',
        width: '100%',
        height: '100%',
        fontSize: '1.5rem',
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const aov = 1;
    const inventoryTurnoverRate = 1;


    const results = backofficeStore.getRevenueData(year);
    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";
    const currency = languageStore.currentLanguage.currency;

    return (
        <Grid item xs={12} sx={valueStyling}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell><b>{languageStore.currentLanguage.aov}:</b>  {aov}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>{languageStore.currentLanguage.conversionRate}:</b>  2%</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><b>{languageStore.currentLanguage.avg} {languageStore.currentLanguage.inventoryTurnover}:</b> {inventoryTurnoverRate} {languageStore.currentLanguage.days.toLowerCase()} {languageStore.currentLanguage.average.toLowerCase()}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
});


const resultIcon = (revenue: number, expenses: number) => {
    if (revenue === 0 && expenses === 0) {
        return (
            <TableCell style={{ color: 'black' }}>
                -
            </TableCell>
        )
    }
    if (revenue > expenses) {
        return (
            <TableCell style={{ color: 'green' }}>
                <ArrowUpward sx={{ color: 'green' }} />
            </TableCell>
        )
    } else {
        return (
            <TableCell style={{ color: 'red' }}>
                <ArrowDownward sx={{ color: 'red' }} />
            </TableCell>
        )
    }
};
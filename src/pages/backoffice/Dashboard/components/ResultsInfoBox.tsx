import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

export type ResultsInfoBoxProps = {
    year: number;
}

export const ResultsInfoBox: React.FC<ResultsInfoBoxProps> = observer(({ year }: ResultsInfoBoxProps) => {

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


    const results = backofficeStore.getRevenueData(year);
    const currentLanguagecode = languageStore.getCurrentLanguageCode() === "en_US" ? "en-US" : "da-DK";
    const currency = languageStore.currentLanguage.currency;

    return (
        <Grid item xs={12} sx={valueStyling}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>{languageStore.currentLanguage.month}</b></TableCell>
                            <TableCell><b>{languageStore.currentLanguage.revenue}</b></TableCell>
                            <TableCell><b>{languageStore.currentLanguage.expenses}</b></TableCell>
                            <TableCell><b>{languageStore.currentLanguage.result}</b></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((month, index) => (
                            <TableRow key={index}>
                                <TableCell>{month.month}</TableCell>
                                <TableCell>{ExtentionMethods.formatPrice(month.revenue, currentLanguagecode, currency)}</TableCell>
                                <TableCell>{ExtentionMethods.formatPrice(month.expenses, currentLanguagecode, currency)}</TableCell>
                                <TableCell>{ExtentionMethods.formatPrice(month.revenue - month.expenses, currentLanguagecode, currency)}</TableCell>
                                {index === 0 ? <TableCell>-</TableCell> : resultIcon(month.revenue, month.expenses)}
                            </TableRow>
                        ))}
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
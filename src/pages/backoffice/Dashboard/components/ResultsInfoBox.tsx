import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { ExtentionMethods } from "@utils/ExtentionMethods";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

export type ResultsInfoBoxProps = {
    year: number;
}

export const ResultsInfoBox: React.FC<ResultsInfoBoxProps> = observer((props: ResultsInfoBoxProps) => {

    const { languageStore, backofficeStore } = useContext(MobXContext);

    const valueStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '95%'
    };


    const results = backofficeStore.getChartData(props.year);
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
                                <TableCell style={{ color: 'green' }}>{ExtentionMethods.formatPrice(month.revenue, currentLanguagecode, currency)}</TableCell>
                                <TableCell style={{ color: 'red' }}>{ExtentionMethods.formatPrice(month.expenses, currentLanguagecode, currency)}</TableCell>
                                <TableCell style={{ color: month.revenue - month.expenses > 0 ? 'green' : 'red' }}><b>{ExtentionMethods.formatPrice(month.revenue - month.expenses, currentLanguagecode, currency)}</b></TableCell>
                                {resultIcon(month.revenue, month.expenses)}
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
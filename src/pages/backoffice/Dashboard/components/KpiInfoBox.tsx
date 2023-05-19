import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
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

    const ordersForYear = backofficeStore.getOrdersByYear(year);
    let inventorySoldCount = 0;
    let inventoryTurnoverRate = 0;
    let aov = 0;
    for (const order of ordersForYear) {
        for (const orderElement of order.orderElements) {
            aov += orderElement.productItem.currentPrice;
            inventorySoldCount += 1;
            const soldDate = orderElement.productItem.soldDate;
            const createdDate = orderElement.productItem.createdDate;
            const daysBetween = (soldDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
            inventoryTurnoverRate += daysBetween;
        }
    }
    aov = aov / ordersForYear.length;
    inventoryTurnoverRate = inventoryTurnoverRate / inventorySoldCount;
    let conversionRate = (Math.random() * 2 + 1).toFixed(2);


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
                            <TableCell>
                                <Tooltip title={languageStore.currentLanguage.aovExplanation}>
                                    <Typography>
                                        <b>{languageStore.currentLanguage.aov}:</b> {aov.toFixed(2)} kr.
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Tooltip title={languageStore.currentLanguage.conversionRateExplanation}>
                                    <Typography>
                                        <b>{languageStore.currentLanguage.conversionRate}:</b>  {conversionRate}%
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Tooltip title={languageStore.currentLanguage.inventoryTurnoverExplanation}>
                                    <Typography>
                                        <b>{languageStore.currentLanguage.avg} {languageStore.currentLanguage.inventoryTurnover}:</b> {inventoryTurnoverRate.toFixed(2)} {languageStore.currentLanguage.days.toLowerCase()} {languageStore.currentLanguage.average.toLowerCase()}
                                    </Typography>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
});
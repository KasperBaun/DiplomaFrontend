import { Box, Table, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
// import { SalesSummary } from "@models/SalesSummary";

export const SalesSummaries = observer(() => {

    const { languageStore, backofficeStore } = useContext(MobXContext);
    // const [salesSummaries, setSalesSummaries] = useState<SalesSummary[] | null>(null);


    return (
        <Box>
            <Typography variant="h3">{languageStore.currentLanguage.SalesSummaryTitle}</Typography>
            <Table>
                <thead>
                    <tr>
                        <th>{languageStore.currentLanguage.SalesSummaryTotalSales}</th>
                        <th>{languageStore.currentLanguage.SalesSummaryTotalAmount}</th>
                    </tr>
                </thead>
                <tbody>
                    {backofficeStore.SalesSummaries.map((sum, index) => (
                        <tr key={"sales_" + index}>
                            <td>{sum.totalSales}</td>
                            <td>{sum.totalAmount.toFixed(2)} DKK</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>
    )
});

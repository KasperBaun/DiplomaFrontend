import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";

const InventoryWidget = () => {
    const { languageStore, backofficeStore } = useContext(MobXContext);
    return (
        <>
            <Row>
                <h3>{languageStore.currentLanguage.InventoryWidgetTitle}</h3>
            </Row>
            <TableContainer sx={{ height: 180 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{languageStore.currentLanguage.InventoryTitle}</TableCell>
                            <TableCell align="left">{languageStore.currentLanguage.InventoryAmountLabel.trim().split(":")[0]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {backofficeStore.categoryProducts.map((item, index) => (
                            <TableRow key={"inventory_" + index}>
                                <TableCell align="left">{languageStore.getCurrentLanguageCode() === "da_DK" ? item.name.split("|")[0] : item.name.split("|")[1]}</TableCell>
                                <TableCell align="left">{item.totalProducts}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default observer(InventoryWidget);

// { CPVStore.CategoryProducts.map((item, index) => (
//     <Grid key={"card_"+index} item xs>
//         <Card className="inventoryCard" sx={{ minWidth: 275 }}>
//             <CardContent>
//                 <Typography variant="h5" component="div">
//                     {item.name}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                     { languageStore.currentLanguage.InventoryAmountLabel + "" + item.totalProducts }
//                 </Typography>
//             </CardContent>
//         </Card>
//     </Grid>
// )) }
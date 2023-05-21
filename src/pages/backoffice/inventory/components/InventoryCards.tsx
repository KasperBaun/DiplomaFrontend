import LoadingLion from "@components/loading/LoadingLion";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import '../inventory.scss';

const InventoryCards = () => {

    const { backofficeStore, languageStore } = useContext(MobXContext);

    if (backofficeStore.categoryProducts) {
        return (
            <Grid container spacing={2}>
                {backofficeStore.categoryProducts.map((item, index) => (
                    <Grid key={"card_" + index} item xs>
                        <Card className="inventoryCard" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {languageStore.getCurrentLanguageCode() === "da-DK" ? item.name.split("|")[0] : item.name.split("|")[1]}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {languageStore.currentLanguage.InventoryAmountLabel + "" + item.totalProducts}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    } else {
        return <LoadingLion />
    }
}

export default observer(InventoryCards);
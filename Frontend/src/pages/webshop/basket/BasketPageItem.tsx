import Grid from "@mui/material/Grid";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite"
import { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Typography } from "@mui/material";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { ExtentionMethods } from "@utils/ExtentionMethods";

type BasketPageItemProps = {
    item: ProductItemWeb
}

export const BasketPageItem: React.FC<BasketPageItemProps> = observer(function BasketPage(props: BasketPageItemProps) {
    const { languageStore, basketStore } = useContext(MobXContext);

    function removeFromCart(item: ProductItemWeb) {
        basketStore.removeFromBasket(item);
    }
    return (
        <Grid container
            spacing={2}
            padding={'1rem'}
        >
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <img
                    src={props.item.images[0].url}
                    style={{
                        maxWidth: '100%',
                        paddingRight: '0.5rem', display: 'flex'
                    }}
                    alt=""
                />
            </Grid>
            <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                <Typography variant="h5" fontWeight={'600'}>{props.item.product.name}</Typography>
                <Typography variant="body1">{languageStore.currentLanguage.modelNumber} : {props.item.product.modelNumber}</Typography>
                <Typography variant="body1">{languageStore.currentLanguage.OrderDetailsManufacturer} : {props.item.product.manufacturer}</Typography>
                <Typography variant="body1">{languageStore.currentLanguage.getCondition(props.item.condition)} </Typography>
                <Typography variant="body1">{languageStore.currentLanguage.getQuality(props.item.quality)} </Typography>
                <Typography variant="body1">{props.item.customText}</Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                <Typography variant="body1" fontWeight={'700'}>{ExtentionMethods.formatPrice(props.item.currentPrice, languageStore.getCurrentLanguageCode(), "DKK")} </Typography>

                <IconButton onClick={() => removeFromCart(props.item)}>
                    <DeleteIcon style={{ color: 'Grey', fontSize: 30 }} />
                </IconButton>
            </Grid>
        </Grid>
    )
});
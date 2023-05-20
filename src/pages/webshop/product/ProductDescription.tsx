import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, Typography } from '@mui/material';
import MobXContext from '@stores/MobXContext';
import { ProductItemWeb } from '@models/ProductItemWeb';

type ProductDescriptionProps = {
    product: ProductItemWeb;
}

const ProductDescription: React.FC<ProductDescriptionProps> = observer(function ProductDescription(props: ProductDescriptionProps) {

    const { languageStore } = useContext(MobXContext);
    const typographyVariant = "h4";

    // function getWeight() {
    //     if (props.product.weight !== 0) {
    //         return (
    //             <Typography><b>{languageStore.currentLanguage.weight} :</b> {props.product.weight}</Typography>
    //         );
    //     }
    // }

    return (
        <Grid item xs={12}>
            <Typography variant="h2" sx={{ marginBottom: '10px' }}>{props.product.product.name}</Typography>
            <Typography variant="h2" color="primary"> {props.product.currentPrice} DKK</Typography><br />

            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.modelNumber} :</b> {props.product.product.modelNumber}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.manufacturer} :</b> {props.product.product.manufacturer}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.design} :</b> {props.product.product.design}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.material} :</b> {languageStore.currentLanguage.getMaterialType(props.product.product.material)}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.dimension} :</b> {props.product.product.dimension}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.condition}: </b>{languageStore.currentLanguage.getCondition(props.product.condition)}</Typography>
            <Typography variant={typographyVariant}><b>{languageStore.currentLanguage.quality}: </b>{languageStore.currentLanguage.getQuality(props.product.quality)}</Typography>
            {/* {getWeight()} */}
            <Typography variant={typographyVariant}>{props.product.customText}</Typography>
        </Grid>
    );
});
export default ProductDescription;
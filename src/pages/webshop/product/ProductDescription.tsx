import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Grid, Typography } from '@mui/material';
import MobXContext from '@stores/MobXContext';
import { ProductItemWeb } from '@models/ProductItemWeb';

type ProductDescriptionProps = {
    product: ProductItemWeb;
    source: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = observer(function ProductDescription(props: ProductDescriptionProps) {

    const { languageStore } = useContext(MobXContext);

    function getWeight() {
        if (props.product.weight !== 0) {
            return (
                <Typography><b>{languageStore.currentLanguage.weight} :</b> {props.product.weight}</Typography>
            );
        }
    }

    function getHeight() {
        if (props.product.product.dimension) {
            return (
                <Typography><b>{languageStore.currentLanguage.dimension} :</b>  {props.product.product.dimension}</Typography>
            );
        }
    }

    function getMaterial() {
        if (props.product.product.material) {
            return (
                <Typography><b>{languageStore.currentLanguage.material} :</b> {languageStore.currentLanguage.getMaterialType(props.product.product.material)}</Typography>
            );
        }
    }

    function getDesigner() {
        if (props.product.product.design) {
            return (
                <Typography><b>{languageStore.currentLanguage.design} :</b> {props.product.product.design}</Typography>
            );
        }
    }

    return (
        <Grid item xs={12}>
            <Box>
                <Typography variant="h3">{props.product.product.name}</Typography>
                <Typography>{languageStore.currentLanguage.modelNumber} : {props.product.product.modelNumber}</Typography>
                <Typography>Kr {props.product.currentPrice} DKK</Typography>
            </Box>

            <Box>
                <Typography fontWeight={600}>{languageStore.currentLanguage.modelSpecifications}:</Typography>
                {getDesigner()}
                {getMaterial()}
                {getHeight()}
                {getWeight()}
                <Typography><b>{languageStore.currentLanguage.condition}: </b>{languageStore.currentLanguage.getCondition(props.product.condition)}</Typography>
                <Typography><b>{languageStore.currentLanguage.quality}: </b>{languageStore.currentLanguage.getQuality(props.product.quality)}</Typography>
                <Typography>{props.product.customText}</Typography>
            </Box>
        </Grid>
    );
});
export default ProductDescription;

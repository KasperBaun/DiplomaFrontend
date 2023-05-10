import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Box, Typography } from '@mui/material';
import MobXContext from '@stores/MobXContext';
import { ProductItemWeb } from '@models/ProductItemWeb';

type ProductDescriptionProps = {
    product: ProductItemWeb;
    source: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = observer(function ProductDescription(props: ProductDescriptionProps) {

    const { languageStore, basketStore } = useContext(MobXContext);

    function handleClick() { basketStore.addToBasket(props.product); }
    function getWeight() {
        if (props.product.weight !== 0) {
            return (
                <Typography>{languageStore.currentLanguage.productPage_weight} : {props.product.weight}</Typography>
            );
        }
    }

    function getHeight() {
        if (props.product.product.dimension) {
            return (
                <Typography>{languageStore.currentLanguage.productPage_productDimension} :  {props.product.product.dimension}</Typography>
            );
        }
    }

    function getMaterial() {
        if (props.product.product.material) {
            return (
                <Typography>{languageStore.currentLanguage.productPage_productMaterial} : {languageStore.currentLanguage.getMaterialType(props.product.product.material)}</Typography>
            );
        }
    }

    function getDesigner() {
        if (props.product.product.design) {
            return (
                <Typography>{languageStore.currentLanguage.productPage_productDesign} : {props.product.product.design}</Typography>
            );
        }
    }

    return (
        <Box>
            <Box>
                <Typography variant="h3">{props.product.product.name}</Typography>
                <Typography>{languageStore.currentLanguage.productPage_productModelNumber} : {props.product.product.modelNumber}</Typography>
                <Typography>Kr {props.product.currentPrice} DKK</Typography>
            </Box>

            <Box>
                <Typography>{languageStore.currentLanguage.getCondition(props.product.condition)}</Typography>
                <Typography>{languageStore.currentLanguage.getQuality(props.product.quality)}</Typography>
                <Typography>{props.product.customText}</Typography>
            </Box>

            <Box>
                <Typography fontWeight={600}>{languageStore.currentLanguage.productPage_modelSpecifications}:</Typography>
                {getDesigner()}
                {getMaterial()}
                {getHeight()}
                {getWeight()}
            </Box>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', mt: '3rem' }}>
                {props.source === "web" ? (<Button variant="outlined" onClick={() => handleClick()} sx={{ width: '12rem', minHeight: '3rem', justifyContent: 'center' }}>{languageStore.currentLanguage.addToBasket}</Button>) : (<></>)}
            </Box>
        </Box>
    );
});
export default ProductDescription;

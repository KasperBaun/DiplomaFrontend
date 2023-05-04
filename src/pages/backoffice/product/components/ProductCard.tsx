import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import ProductItem from "@models/ProductItem";
import { useContext } from "react";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

export interface IProductCardProps {
    productItem: ProductItem;
    onProductItemClicked: (productItem: ProductItem) => void;
}

const ProductCard: React.FC<IProductCardProps> = observer(function ProductCard(props: IProductCardProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);

    const handleOnProductItemClicked = () => {
        props.onProductItemClicked(props.productItem);
    };

    const name: string = props.productItem.product.name ? props.productItem.product.name : '';
    const price: string = props.productItem.currentPrice ? props.productItem.currentPrice.toString() : '0';
    const modelNumber: string = props.productItem.product.modelNumber ? props.productItem.product.modelNumber : '';
    const material: string = props.productItem.product.material ? languageStore.currentLanguage.getMaterialType(props.productItem.product.material) : '';
    const design: string = props.productItem.product.design ? props.productItem.product.design : '';
    const quality: string = props.productItem.quality ? languageStore.currentLanguage.getQuality(props.productItem.quality) : '';
    //const dimension: string = props.productItem.product.dimension ? props.productItem.product.dimension : '';
    const description: string = props.productItem.customText ? props.productItem.customText : '';

    return (
        <Card sx={{ width: '300px' }}>

            <CardHeader
                avatar={<FiberManualRecord sx={{ color: props.productItem.sold ? 'red' : 'green' }} />}
                title={props.productItem.sold ? languageStore.currentLanguage.sold : languageStore.currentLanguage.forSale}
            >

            </CardHeader>
            <CardMedia
                component="img"
                height={200}
                onClick={handleOnProductItemClicked}
                image={props.productItem.images[0]?.url ? props.productItem.images[0].url : "https://picsum.photos/200/300?grayscale"}
                alt="Category image for category card"
                style={{ objectFit: "cover" }}
            />
            <CardContent>
                <Typography variant="h5" color="text.primary" sx={{ maxHeight: '80px', overflow: 'hidden' }}>
                    {/* <b>{languageStore.currentLanguage.productPage_productName}</b>: {name} */}<b>{name}</b>
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.productPage_productModelNumber}</b>: {modelNumber}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.productPage_productMaterial}</b>: {material}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.productPage_productDesign}</b>: {design}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.productPage_productQuality}</b>: {quality}
                </Typography>
                {/* <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.productPage_productDimension}</b>: {dimension}
                </Typography> */}
                <Typography variant="body1" color="text.primary">
                    <b>{languageStore.currentLanguage.price}</b>: {price}
                </Typography>
                {description.length > 0 &&
                    <Typography variant="body1" color="text.primary">
                        <b>{languageStore.currentLanguage.description}</b>: {description}
                    </Typography>
                }
            </CardContent>
            <CardActions style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            </CardActions>
        </Card>
    )
});

export default ProductCard;
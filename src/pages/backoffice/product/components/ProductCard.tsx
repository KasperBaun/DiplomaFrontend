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

    const { languageStore, backofficeStore } = useContext<IMobXContext>(MobXContext);

    const handleOnProductItemClicked = () => {
        props.onProductItemClicked(props.productItem);
    };



    return (
        <Card sx={{ width: '300px' }}>

            <CardHeader
                avatar={<FiberManualRecord sx={{ color: props.productItem.sold ? 'red' : 'green' }} />}
                title={props.productItem.sold ? 'SOLD' : 'Active on website'}
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
                    {props.productItem.product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.productItem.product.modelNumber}
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
            </CardActions>
        </Card>
    )
});

export default ProductCard;
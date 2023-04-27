import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import ProductItem from "@models/ProductItem";
import { useContext } from "react";
import { Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { Delete, Edit, FiberManualRecord } from "@mui/icons-material";

export interface IProductCardProps {
    productItem: ProductItem;
    onUpdateClicked: (product: ProductItem) => void;
    onDeleteClicked: (productId: number) => Promise<void>;
    onProductItemClicked: (product: ProductItem) => void;
}

const ProductCard: React.FC<IProductCardProps> = observer(function ProductCard(props: IProductCardProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);

    const handleOnUpdateClicked = () => {
        props.onUpdateClicked(props.productItem);
    };

    const handleOnDeleteClicked = () => {
        props.onDeleteClicked(props.productItem.id);
    };
    const handleOnProductItemClicked = () => {
        props.onProductItemClicked(props.productItem);
    };


    return (
        <Card sx={{ width: '300px' }}>
            <CardHeader
                avatar={<FiberManualRecord sx={{ color: 'green' }} />}
                action={
                    <IconButton onClick={handleOnDeleteClicked} aria-label="delete">
                        <Delete />
                    </IconButton>
                }
                title={<FiberManualRecord sx={{ color: 'green' }} /> && 'Active on website'}
            >
                <FiberManualRecord sx={{ color: 'green' }} /> Active on website'
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
                <IconButton onClick={handleOnUpdateClicked} aria-label="edit">
                    <Edit />
                </IconButton>


            </CardActions>
        </Card>
        // <Card style={productCardItem}>
        //     {/*<Card.Img variant="top" src={props.product.imageUrls[0] || "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg" } />*/}
        //     <Card.Body onClick={() => props.showProductClicked(props.productItem)}>
        //         <Card.Title>{props.productItem.product.name}</Card.Title>
        //         <Card.Subtitle>{props.productItem.product.modelNumber}</Card.Subtitle>
        //         <Card.Text>
        //             {/* {languageStore.currentLanguage.productPage_productCondition}: {props.product.condition || 'N/A'} */}
        //         </Card.Text>
        //         <Card.Text>
        //         </Card.Text>
        //         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        //             <Button variant="outline-success"><Plus /></Button>
        //             <Button variant="outline-secondary" onClick={() => props.handleOnUpdateClicked(props.productItem)}><Pencil /></Button>
        //             <Button variant="outline-danger" onClick={() => props.handleOnDeleteClicked(props.productItem.id)}><XLg /></Button>
        //         </div>
        //     </Card.Body>
        // </Card >
    )
});

export default ProductCard;
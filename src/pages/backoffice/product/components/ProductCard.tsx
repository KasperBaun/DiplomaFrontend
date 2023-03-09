import Product from "@models/Product";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Pencil, XLg, Plus } from "react-bootstrap-icons";
import { productCardItem } from "../ProductsStyling";

export interface IProductCardProps {
    className?: string;
    product: Product;
    handleOnUpdateClicked: (product: Product) => void;
    handleOnDeleteClicked: (productId: number) => Promise<void>;
    showProductClicked: (product: Product) => void;
}

const ProductCard: React.FC<IProductCardProps> = observer(function ProductCard(props: IProductCardProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);


    return (
        <Card style={productCardItem}>
            <Card.Img variant="top" src={props.product.imageUrls[0]} />
            <Card.Body onClick={() => props.showProductClicked(props.product)}>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Subtitle>{props.product.modelNumber}</Card.Subtitle>
                <Card.Text>
                    {languageStore.currentLanguage.productPage_productCondition}: {props.product.condition || 'N/A'}
                </Card.Text>
                <Card.Text>
                </Card.Text>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button variant="outline-success"><Plus /></Button>
                    <Button variant="outline-secondary" onClick={() => props.handleOnUpdateClicked(props.product)}><Pencil /></Button>
                    <Button variant="outline-danger" onClick={() => props.handleOnDeleteClicked(props.product.id)}><XLg /></Button>
                </div>
            </Card.Body>
        </Card >
    )
});

export default ProductCard;
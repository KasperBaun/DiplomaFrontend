import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Pencil, XLg, Plus } from "react-bootstrap-icons";
import { productCardItem } from "../ProductsStyling";
import ProductItem from "@models/ProductItem";

export interface IProductCardProps {
    className?: string;
    productItem: ProductItem;
    handleOnUpdateClicked: (product: ProductItem) => void;
    handleOnDeleteClicked: (productId: number) => Promise<void>;
    showProductClicked: (product: ProductItem) => void;
}

const ProductCard: React.FC<IProductCardProps> = observer(function ProductCard(props: IProductCardProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);


    return (
        <Card style={productCardItem}>
            {/*<Card.Img variant="top" src={props.product.imageUrls[0] || "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg" } />*/}
            <Card.Body onClick={() => props.showProductClicked(props.productItem)}>
                <Card.Title>{props.productItem.product.name}</Card.Title>
                <Card.Subtitle>{props.productItem.product.modelNumber}</Card.Subtitle>
                <Card.Text>
                    {/* {languageStore.currentLanguage.productPage_productCondition}: {props.product.condition || 'N/A'} */}
                </Card.Text>
                <Card.Text>
                </Card.Text>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button variant="outline-success"><Plus /></Button>
                    <Button variant="outline-secondary" onClick={() => props.handleOnUpdateClicked(props.productItem)}><Pencil /></Button>
                    <Button variant="outline-danger" onClick={() => props.handleOnDeleteClicked(props.productItem.id)}><XLg /></Button>
                </div>
            </Card.Body>
        </Card >
    )
});

export default ProductCard;
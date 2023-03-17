import Product from "@models/Product";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { productCardContainer } from "../ProductsStyling";
import ProductItem from "@models/ProductItem";


export interface IProductCardsProps {
    products: ProductItem[];
}

const ProductCards: React.FC<IProductCardsProps> = observer(function ProductCards(props: IProductCardsProps) {

    const { productStore, } = useContext(MobXContext);
    const [selectedProductItem, setSelectedProductItem] = useState<ProductItem>();
    const [visibleUpdate, setVisibilityUpdate] = useState(false);
    const onOpenUpdate = () => setVisibilityUpdate(true);
    const onCloseUpdate = () => setVisibilityUpdate(false);

    const handleOnDeleteClicked = async (id: number) => {
        // Pop Modal to confirm?
        const subCatToBeDeleted = await productStore.getProduct(id);
        if (subCatToBeDeleted !== null) {
            const deleted = await productStore.deleteProduct(id);
            alert("Successfully deleted product: " + subCatToBeDeleted.name)
        } else {
            alert("Could not find product with id: " + id);
        }
    }

    function handleOnUpdateClicked(productItem: ProductItem) {
        setSelectedProductItem(productItem);
        onOpenUpdate();
    }


    function showProductClicked(productItem: ProductItem): void {
        // Pop Modal with product info
    }
    return (
        <Container >
            <Row style={productCardContainer}>
                {props.products.map((product: ProductItem) => {
                    return (
                        <ProductCard
                            productItem={product}
                            handleOnDeleteClicked={handleOnDeleteClicked}
                            handleOnUpdateClicked={handleOnUpdateClicked}
                            showProductClicked={showProductClicked}
                        />
                    )
                })}
            </Row>
        </Container>
    )
});

export default ProductCards;
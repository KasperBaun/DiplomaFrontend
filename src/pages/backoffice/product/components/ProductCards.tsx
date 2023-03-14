import Product from "@models/Product";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { productCardContainer } from "../ProductsStyling";


export interface IProductCardsProps {
    products: Product[];
}

const ProductCards: React.FC<IProductCardsProps> = observer(function ProductCards(props: IProductCardsProps) {

    const { productStore, } = useContext(MobXContext);
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [visibleUpdate, setVisibilityUpdate] = useState(false);
    const onOpenUpdate = () => setVisibilityUpdate(true);
    const onCloseUpdate = () => setVisibilityUpdate(false);

    const handleOnDeleteClicked = async (id: number) => {
        // Pop Modal to confirm?
        const subCatToBeDeleted = await productStore.getProduct(id);
        if (subCatToBeDeleted !== null) {
            const deleted = await productStore.deleteProduct(id);
            if (deleted) {
                alert("Successfully deleted product: " + subCatToBeDeleted.name)
            } else {
                alert("Failed to delete product: " + subCatToBeDeleted.name)
            }
        } else {
            alert("Could not find product with id: " + id);
        }
    }

    function handleOnUpdateClicked(product: Product) {
        setSelectedProduct(product);
        onOpenUpdate();
    }


    function showProductClicked(product: Product): void {
        // Pop Modal with product info
    }
    return (
        <Container >
            <Row style={productCardContainer}>
                {props.products.map((product: Product) => {
                    return (
                        <ProductCard
                            product={product}
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
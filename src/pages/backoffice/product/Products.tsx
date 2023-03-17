import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { Form } from "react-bootstrap";
import ProductCards from "./components/ProductCards";
import Loading from "@components/loading/Loading";
import ProductItem from "@models/ProductItem";

const Products: React.FC = observer(function Products() {

    const { languageStore, categoryStore, backofficeStore, subCategoryStore } = useContext(MobXContext)

    const [visibleCreate, setVisibilityCreate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);
    const [productItems, setProductItems] = useState<ProductItem[]>(backofficeStore.productItems);


    function handleOnResetClicked(): void {
        setProductItems(backofficeStore.productItems);
    }

    function filterByCategory(categoryId: number) {
        // Return new items filtered by category
        const subCategories = subCategoryStore.subCategories.filter(subcat => subcat.categoryId === categoryId);
        const filteredProducts = productItems.filter(prodItem => subCategories.some(subcat => subcat.id === prodItem.product.subcategoryId));
        setProductItems(filteredProducts);
    }

    function handleOptionChange(event: any): React.ChangeEventHandler<HTMLSelectElement> {
        if (event.currentTarget.value === "initValue") {
            return;
        } else {
            filterByCategory(event.currentTarget.value);
        }
    };

    if (!backofficeStore.isLoaded) {
        return (
            <Loading />
        )

    }

    else {

        return (
            <Container fluid className="BO_ProductsContainer">
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="search" placeholder="Search by name..." />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Filter by category</Form.Label>
                            <Form.Select aria-label="Select category" onChange={handleOptionChange}>
                                <option key="initKey" value="initValue" >{languageStore.currentLanguage.createSubCategorySelectCategoryTitle}</option>
                                {categoryStore.Categories.map((category, index) => {
                                    return (
                                        <option key={"option" + category.name + index} value={category.id}>{category.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" onClick={handleOnResetClicked}>
                            Reset
                        </Button>
                    </Form>
                </Row>
                <Row className="alignToEnd">
                    <Button size="lg" variant='outline-primary' className="createButton" onClick={onOpenCreate}>{languageStore.currentLanguage.productPage_createProduct}</Button>
                </Row>
                <Row className="element">
                    <ProductCards products={productItems} />
                </Row>
            </Container>
        )
    }
});

export default Products;
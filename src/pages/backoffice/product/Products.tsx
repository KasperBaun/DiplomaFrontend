import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import { Form, Spinner } from "react-bootstrap";
import ProductCards from "./components/ProductCards";
import Product from "@models/Product";

const Products: React.FC = observer(function Products() {

    const { productStore, languageStore, categoryStore, subCategoryStore } = useContext(MobXContext)
    const [loading, setLoading] = useState<boolean>(productStore.Products.length > 0);
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const loadProducts = async (): Promise<void> => {
            productStore.loadProducts();
        }
        if (productStore.isLoaded) {
            setProducts(productStore.Products);
            setLoading(false);
        } else {
            loadProducts();
            setProducts(productStore.Products);
        }
    }, [productStore.isLoaded])

    const [visibleCreate, setVisibilityCreate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);

    function handleOnResetClicked(): void {
        setProducts(productStore.Products);
    }

    function filterByCategory(categoryId: number) {
        // Return new items filtered by category
        const subCategories = subCategoryStore.subCategories.filter(subcat => subcat.categoryId === categoryId);
        const filteredProducts = products.filter(prod => subCategories.some(subcat => subcat.id === prod.subcategoryId));
        setProducts(filteredProducts);
    }

    function handleOptionChange(event: any): React.ChangeEventHandler<HTMLSelectElement> {
        if (event.currentTarget.value === "initValue") {
            return;
        } else {
            filterByCategory(event.currentTarget.value);
        }
    };

    if (loading) {
        return (
            <Container style={{ textAlign: "center", padding: "15rem" }}>
                <Spinner animation="grow" variant="secondary" /> Loading...
            </Container>
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
                    <ProductCards products={productStore.Products} />
                </Row>
            </Container>
        )
    }
});

export default Products;
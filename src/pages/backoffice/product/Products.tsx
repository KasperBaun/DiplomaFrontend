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
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { productCardContainer } from "./ProductsStyling";

const Products: React.FC = observer(function Products() {

    const { languageStore, categoryStore, backofficeStore, subCategoryStore, productStore } = useContext(MobXContext)

    const [visibleCreate, setVisibilityCreate] = useState(false);
    const onOpenCreate = () => setVisibilityCreate(true);
    const onCloseCreate = () => setVisibilityCreate(false);
    const [productItems, setProductItems] = useState<ProductItem[]>(productStore.ProductItems);
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>(null);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);


    function handleOnResetClicked(): void {
        setProductItems(productStore.ProductItems);
    }

    function filterByCategory(categoryId: number) {
        setSelectedCategory(categoryStore.getCategory(categoryId));
        const filteredProducts = productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
        setProductItems(filteredProducts);
    }

    function handleCategoryChange(event: any): React.ChangeEventHandler<HTMLSelectElement> {
        if (event.currentTarget.value === "initValue") {
            if (selectedCategory !== null) {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSubcategories([]);
                setProductItems(productStore.ProductItems);
            }
            return;
        } else {
            filterByCategory(event.currentTarget.value);
            setSubcategories(subCategoryStore.SubCategories.filter(subcat => subcat.categoryId === event.currentTarget.value));
        }
    };

    function filterBySubcategory(subcategoryId: number) {
        setSelectedSubcategory(subCategoryStore.getSubcategory(subcategoryId));
        const filteredProducts = productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategoryId));
        setProductItems(filteredProducts);
    }

    function handleSubcategoryChange(event: any): React.ChangeEventHandler<HTMLSelectElement> {
        if (event.currentTarget.value === "initValue") {
            setSelectedSubcategory(null);
            return
        }
        else {
            filterBySubcategory(event.currentTarget.value);
        }
    }

    if (!backofficeStore.productItems && backofficeStore.productItems.length === 0) {
        return (
            <Loading />
        )
    }

    else {

        return (
            <Container fluid style={{ ...productCardContainer }}>
                <Row>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Search</Form.Label>
                            <Form.Control type="search" placeholder="Search by name..." />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Filter by category</Form.Label>
                            <Form.Select aria-label="Select category" onChange={handleCategoryChange}>
                                <option key="initKey" value="initValue" >{languageStore.currentLanguage.createSubCategorySelectCategoryTitle}</option>
                                {categoryStore.Categories.map((category, index) => {
                                    return (
                                        <option key={"option" + category.name + index} value={category.id}>{category.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Filter by subcategory</Form.Label>
                            <Form.Select aria-label="Select subcategory" onChange={handleSubcategoryChange}>
                                <option key="initKey" value="initValue" >{"Select subcategory..."}</option>
                                {subcategories.map((subcategory, index) => {
                                    return (
                                        <option key={"option" + subcategory.name + index} value={subcategory.id}>{subcategory.name}</option>
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
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Loading from "@components/loading/Loading";
import ProductItem from "@models/ProductItem";
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { Button, Grid } from "@mui/material";
import ProductCard from "./components/ProductCard";

export interface IProductsProps {
    onProductItemClicked: (productItem: ProductItem) => void;
}

const Products: React.FC<IProductsProps> = observer(function Products(props: IProductsProps) {

    /* Define state for products and selected category & subcategory - Inject stores */
    const { categoryStore, languageStore, backofficeStore, subCategoryStore } = useContext(MobXContext);
    const [productItems, setProductItems] = useState<ProductItem[]>(backofficeStore.ProductItems);
    const [subcategories, setSubcategories] = useState<SubCategory[]>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>(null);

    /* Define the event handlers for the buttons */
    const handleOnResetClicked = (): void => {
        setProductItems(backofficeStore.ProductItems);
    };

    const handleOnCreateClicked = (): void => {
        props.onProductItemClicked(null);
    };

    const handleCategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.currentTarget.value === "initValue") {
            if (selectedCategory !== null) {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSubcategories([]);
                setProductItems(backofficeStore.ProductItems);
            }
            return;
        } else {
            filterByCategory(event.currentTarget.value);
            setSubcategories(subCategoryStore.SubCategories.filter(subcat => subcat.categoryId === event.currentTarget.value));
        }
    };

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.currentTarget.value === "initValue") {
            setSelectedSubcategory(null);
            return
        }
        else {
            filterBySubcategory(event.currentTarget.value);
        }
    }

    const filterBySubcategory = (subcategoryId: number) => {
        setSelectedSubcategory(subCategoryStore.getSubcategory(subcategoryId));
        const filteredProducts = productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategoryId));
        setProductItems(filteredProducts);
    }
    const filterByCategory = (categoryId: number) => {
        setSelectedCategory(categoryStore.getCategory(categoryId));
        const filteredProducts = productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
        setProductItems(filteredProducts);
    }

    if (!backofficeStore.productItems && backofficeStore.productItems.length === 0) {
        return (
            <Loading />
        )
    }

    else {

        return (
            <Grid container >
                <Grid item xs={12} display={'flex'} justifyContent={'start'} margin='10px'>
                    <Button style={{ width: "12rem" }} variant="contained" onClick={handleOnCreateClicked}>{languageStore.currentLanguage.createCategoryDialogTitle}</Button>
                    <Button style={{ width: "12rem" }} variant="contained" onClick={handleOnResetClicked}>{languageStore.currentLanguage.reset}</Button>
                </Grid>

                {/* Productcards */}
                {backofficeStore.ProductItems.map((product, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                            <ProductCard
                                productItem={product}
                                onProductItemClicked={props.onProductItemClicked}
                            />
                        </Grid>
                    )
                })}

            </Grid>

            //     {/* <Row>
            //         <Form>
            //             <Form.Group className="mb-3" controlId="formBasicEmail">
            //                 <Form.Label>Search</Form.Label>
            //                 <Form.Control type="search" placeholder="Search by name..." />
            //             </Form.Group>

            //             <Form.Group>
            //                 <Form.Label>Filter by category</Form.Label>
            //                 <Form.Select aria-label="Select category" onChange={handleCategoryChange}>
            //                     <option key="initKey" value="initValue" >{languageStore.currentLanguage.createSubCategorySelectCategoryTitle}</option>
            //                     {categoryStore.Categories.map((category, index) => {
            //                         return (
            //                             <option key={"option" + category.name + index} value={category.id}>{category.name}</option>
            //                         )
            //                     })}
            //                 </Form.Select>
            //             </Form.Group>

            //             <Form.Group>
            //                 <Form.Label>Filter by subcategory</Form.Label>
            //                 <Form.Select aria-label="Select subcategory" onChange={handleSubcategoryChange}>
            //                     <option key="initKey" value="initValue" >{"Select subcategory..."}</option>
            //                     {subcategories.map((subcategory, index) => {
            //                         return (
            //                             <option key={"option" + subcategory.name + index} value={subcategory.id}>{subcategory.name}</option>
            //                         )
            //                     })}
            //                 </Form.Select>
            //             </Form.Group>

            //             <Button variant="primary" onClick={handleOnResetClicked}>
            //                 Reset
            //             </Button>
            //         </Form>
            //     </Row>
            //     <Row className="alignToEnd">
            //         <Button size="lg" variant='outline-primary' className="createButton" onClick={onOpenCreate}>{languageStore.currentLanguage.productPage_createProduct}</Button>
            //     </Row>
            //     <Row className="element">
            //         <ProductCards products={productItems} />
            //     </Row>
            // </Container> */}
        )
    }
});

export default Products;
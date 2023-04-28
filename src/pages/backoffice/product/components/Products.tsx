import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Loading from "@components/loading/Loading";
import ProductItem from "@models/ProductItem";
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ProductCard from "./ProductCard";
import { toJS } from "mobx";

export interface IProductsProps {
    onProductItemClicked: (productItem: ProductItem) => void;
}

const Products: React.FC<IProductsProps> = observer(function Products(props: IProductsProps) {

    /* Define state for products and selected category & subcategory - Inject stores */
    const { categoryStore, languageStore, backofficeStore, subCategoryStore } = useContext(MobXContext);
    const [productItems, setProductItems] = useState<ProductItem[]>(backofficeStore.ProductItems.slice(0, backofficeStore.ProductItems.length / 5));
    const [subcategories, setSubcategories] = useState<SubCategory[]>(backofficeStore.subCategories);
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>(null);
    const [searchText, setSearchText] = useState<string>("");

    /* Define the event handlers for the buttons */
    const handleSearchTextChange = (event: any): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => {
        setSearchText(event.target.value);

        return;
    }

    function handleEnterKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            // Enter key was pressed
            const filteredProductItems = backofficeStore.ProductItems.filter(
                productItem =>
                    productItem.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    productItem.product.modelNumber.toString().includes(searchText.toLowerCase())

            );
            setProductItems(filteredProductItems);
        } else {
            // Some other key was pressed do nothing
        }
    }

    const handleOnResetClicked = (): void => {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setSubcategories(subCategoryStore.SubCategories);
        setProductItems(backofficeStore.ProductItems.slice(0, backofficeStore.ProductItems.length / 5));
    };

    const handleOnShowAllClicked = (): void => {
        setProductItems(backofficeStore.ProductItems);
    }

    const handleOnCreateClicked = (): void => {
        props.onProductItemClicked(null);
    };

    const handleCategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            if (selectedCategory !== null) {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSubcategories([]);
                setProductItems(backofficeStore.ProductItems);
            }
            return;
        } else {
            filterByCategory(event.target.value);
        }
    };

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            setSelectedSubcategory(null);
            return;
        }
        else {
            filterBySubcategory(event.target.value);
            return;
        }
    }

    const filterBySubcategory = (subcategoryId: number) => {
        setSelectedSubcategory(subCategoryStore.getSubcategory(subcategoryId));
        const filteredProducts = backofficeStore.ProductItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategoryId));
        setProductItems(filteredProducts);
    }
    const filterByCategory = (categoryId: number) => {
        setSelectedSubcategory(null);
        setSelectedCategory(categoryStore.getCategory(categoryId));
        const filteredProducts = backofficeStore.ProductItems.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
        setProductItems(filteredProducts);
        setSubcategories(subCategoryStore.SubCategories.filter(subcat => subcat.categoryId === categoryId));
    }

    if (!backofficeStore.isLoaded) {
        return (
            <Loading />
        )
    }

    else {

        return (
            <Grid container >
                <Grid item xs={12} display={'flex'} justifyContent={'start'} >
                    <Button style={{ width: "12rem", margin: '5px' }} variant="contained" onClick={handleOnCreateClicked}>{languageStore.currentLanguage.productPage_createProduct}</Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField
                            label={languageStore.currentLanguage.search}
                            type="search"
                            placeholder={languageStore.currentLanguage.search.toLowerCase() + "..."}
                            value={searchText}
                            onChange={handleSearchTextChange}
                            sx={{ marginRight: '10px', minWidth: '15vw' }}
                            onKeyDownCapture={handleEnterKeyDown}
                        />

                        <FormControl sx={{ marginRight: '10px', minWidth: '15vw' }}>
                            <InputLabel>{languageStore.currentLanguage.filterByCategory}</InputLabel>
                            <Select value={selectedCategory ? selectedCategory.id : ''} onChange={handleCategoryChange} aria-label={languageStore.currentLanguage.selectCategory}>
                                {backofficeStore.Categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ marginRight: '10px', minWidth: '15vw' }}>
                            <InputLabel>{languageStore.currentLanguage.filterBySubcategory}</InputLabel>
                            <Select
                                value={selectedSubcategory ? selectedSubcategory.id : ''}
                                onChange={handleSubcategoryChange}
                                aria-label={languageStore.currentLanguage.selectSubcategory}
                            >
                                {subcategories.map((subcategory) => (
                                    <MenuItem key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnShowAllClicked}>{languageStore.currentLanguage.showAll}</Button>
                    <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnResetClicked}>{languageStore.currentLanguage.reset}</Button>
                </Grid>


                {/* Productcards */}
                {productItems.length === 0 && <div style={{ marginTop: '20px' }}>Ingen produkter</div>}
                {productItems.length > 0 &&
                    productItems.map((product, index) => {
                        // console.log(toJS(product))
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                                <ProductCard
                                    productItem={product}
                                    onProductItemClicked={props.onProductItemClicked}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid >
        )
    }
});

export default Products;
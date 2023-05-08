import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import { ProductItem } from "@models/ProductItem";
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { ProductSearchBar } from "./ProductSearchBar";
import { SearchState } from "@models/SearchState";

export type ProductSearchProps = {
    showSearchBar?: boolean;
    categories: Category[];
    subcategories: SubCategory[];
    items: ProductItem[] | ProductItemWeb[];
    searchState: SearchState;
    onItemsChanged: (items: ProductItem[] | ProductItemWeb[]) => void;
    onProductItemClicked?: (productItem: ProductItem) => void;
}

type ProductSearchState = {
    selectedCategory: Category | null;
    selectedSubcategory: SubCategory | null;
    displayedSubcategories: SubCategory[];
    searchText: string;
    items: ProductItem[] | ProductItemWeb[];
};

export const ProductSearch: React.FC<ProductSearchProps> = observer(function ProductSearch(props: ProductSearchProps) {

    const { items, showSearchBar, categories, subcategories, onItemsChanged } = props;
    const currentState: ProductSearchState = setState(props.searchState, items, categories, subcategories);

    /* Define state for products and selected category & subcategory - Inject stores */
    const { languageStore } = useContext(MobXContext);
    const [selectedCategory, setSelectedCategory] = useState<Category>(props.searchState ? currentState.selectedCategory : null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory>(props.searchState ? currentState.selectedSubcategory : null);
    const [displayedSubcategories, setDisplayedSubcategories] = useState<SubCategory[]>(props.searchState ? currentState.displayedSubcategories : null);
    const [searchText, setSearchText] = useState<string>(props.searchState ? currentState.searchText : '');



    useEffect(() => {
        /* Use callback function to return filtered items if state provided changed items */
        if (currentState.items !== items && currentState.items !== null) {
            onItemsChanged(currentState.items);
        }
    })

    /* Define the event handlers for the events */
    const handleSearchTextChanged = (newItems: ProductItem[] | ProductItemWeb[]): void => {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        onItemsChanged(newItems);
    }

    const handleOnResetClicked = (): void => {
        setSearchText("");
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        onItemsChanged(items);
    };

    const handleCategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            if (selectedCategory !== null) {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setDisplayedSubcategories([]);
                onItemsChanged(items);
            }
            return;
        } else {
            // Filter productitems by category
            const categoryId: number = event.target.value;
            setSelectedSubcategory(null);
            setSelectedCategory(categories.find(cat => cat.id === categoryId));
            const filteredProducts = items.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
            setDisplayedSubcategories(subcategories.filter(subcat => subcat.categoryId === categoryId));
            onItemsChanged(filteredProducts);
        }
    };

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            setSelectedSubcategory(null);
            return;
        }
        else {
            // Filter productitems by subcategory
            const subcategoryId: number = event.target.value;
            setSelectedSubcategory(subcategories.find(s => s.id === subcategoryId));
            const filteredProducts = items.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategoryId));
            onItemsChanged(filteredProducts);
            return;
        }
    }

    return (
        <Grid container >

            <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <ProductSearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        showSearchBar={showSearchBar}
                        productItems={items}
                        onItemsChanged={handleSearchTextChanged}
                        style={{ marginRight: '10px', minWidth: '15vw' }}
                    />

                    <FormControl sx={{ marginRight: '10px', minWidth: '15vw' }}>
                        <InputLabel>{languageStore.currentLanguage.filterByCategory}</InputLabel>
                        <Select value={selectedCategory ? selectedCategory.id : ''} onChange={handleCategoryChange} aria-label={languageStore.currentLanguage.selectCategory}>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {languageStore.getCurrentLanguageCode() === "da_DK" ? category.name.split("|")[0] : category.name.split("|")[1]}
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
                            {displayedSubcategories.map((subcategory) => (
                                <MenuItem key={subcategory.id} value={subcategory.id}>
                                    {languageStore.getCurrentLanguageCode() === "da_DK" ? subcategory.name.split("|")[0] : subcategory.name.split("|")[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnResetClicked}>{languageStore.currentLanguage.reset}</Button>
            </Grid>
        </Grid >
    )
});

export default ProductSearch;


function setState(searchState: SearchState, allItems: ProductItem[] | ProductItemWeb[], categories: Category[], subcategories: SubCategory[]): ProductSearchState {
    const productSearchState: ProductSearchState = {
        items: allItems,
        selectedCategory: null,
        selectedSubcategory: null,
        displayedSubcategories: [],
        searchText: ""
    };

    if (searchState === null || undefined) {
        return productSearchState;
    }

    if (searchState.searchText && searchState.searchText.length > 0) {
        const filteredItems = allItems.filter(prodItem =>
            prodItem.product.name.toLowerCase().includes(searchState.searchText.toLowerCase())
            || prodItem.product.modelNumber.toLowerCase().includes(searchState.searchText.toLowerCase())
        );
        productSearchState.items = filteredItems;
    }
    if (searchState.subcategoryId && searchState.subcategoryId > 0) {
        const subcategory = subcategories.find(c => c.id === searchState.subcategoryId);
        const filteredItems = allItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === searchState.subcategoryId));
        productSearchState.items = filteredItems;
        productSearchState.selectedSubcategory = subcategories.find(subcat => subcat.id === searchState.subcategoryId);
        productSearchState.selectedCategory = categories.find(cat => cat.id === subcategory.categoryId);
        productSearchState.displayedSubcategories = subcategories.filter(subcat => subcat.categoryId === searchState.categoryId);
    }
    return productSearchState;
}
import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { ProductItem } from "@models/ProductItem";
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { ProductItemWeb } from "@models/ProductItemWeb";
import { ProductSearchBar } from "./ProductSearchBar";

export type ProductSearchProps = {
    showSearchBar?: boolean;
    items: ProductItem[] | ProductItemWeb[];
    categories: Category[];
    subcategories: SubCategory[];
    onProductItemClicked?: (productItem: ProductItem) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = observer(function ProductSearch(props: ProductSearchProps) {

    const { showSearchBar, categories, subcategories, items } = props;

    /* Define state for products and selected category & subcategory - Inject stores */
    const { languageStore, searchStore } = useContext(MobXContext);
    const [searchText, setSearchText] = useState<string>('');

    searchStore.selectedSubcategories = subcategories;

    /* Define the event handlers for the events */
    const handleSearchTextChanged = (searchText: string): void => {
        searchStore.filterBySearchText(searchText);
    }

    const handleOnResetClicked = (): void => {
        searchStore.reset();
    }

    const handleCategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            searchStore.reset();
        } else {
            const categoryId: number = event.target.value;
            searchStore.filterByCategory(categoryId);
        }
        return;
    };

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            searchStore.selectedSubcategory = null;
        }
        else {
            const subcategoryId: number = event.target.value;
            searchStore.filterBySubcategory(subcategoryId);
        }
        return;
    }

    return (
        <Grid container >

            <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <ProductSearchBar
                        searchText={searchText}
                        setSearchText={setSearchText}
                        showSearchBar={showSearchBar}
                        onSearchTextChanged={handleSearchTextChanged}
                        style={{ marginRight: '10px', minWidth: '15vw' }}
                    />

                    <FormControl sx={{ marginRight: '10px', minWidth: '15vw' }}>
                        <InputLabel>{languageStore.currentLanguage.filterByCategory}</InputLabel>
                        <Select
                            value={searchStore.selectedCategory ? searchStore.selectedCategory.id : ''}
                            onChange={handleCategoryChange}
                            aria-label={languageStore.currentLanguage.selectCategory}
                            label={languageStore.currentLanguage.filterByCategory}
                        >
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
                            value={searchStore.selectedSubcategory ? searchStore.selectedSubcategory.id : ''}
                            onChange={handleSubcategoryChange}
                            aria-label={languageStore.currentLanguage.selectSubcategory}
                            label={languageStore.currentLanguage.filterBySubcategory}
                        >
                            {searchStore.selectedSubcategories.map((subcategory) => (
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
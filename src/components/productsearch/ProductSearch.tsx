import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { ProductSearchBar } from "./ProductSearchBar";

type ProductSearchProps = {
    categories: Category[];
    subcategories: SubCategory[];
    selectedCategory: Category;
    selectedSubcategory: SubCategory;
    displayItemsCount: number;
    totalItemsCount: number;
    setSelectedSubcategory: (subcategory: SubCategory) => void;
    filterBySearchText: (searchText: string) => void;
    filterByCategory: (categoryId: number) => void;
    filterBySubcategory: (subcategoryId: number) => void;
    reset: () => void;
    showSearchBar?: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = observer(function ProductSearch(props: ProductSearchProps) {

    const {
        categories,
        subcategories,
        selectedCategory,
        selectedSubcategory,
        displayItemsCount,
        totalItemsCount,
        setSelectedSubcategory,
        filterBySearchText,
        filterByCategory,
        filterBySubcategory,
        reset,
        showSearchBar,
    } = props;

    /* Define state for products and selected category & subcategory - Inject stores */
    const { languageStore } = useContext(MobXContext);
    const [searchText, setSearchText] = useState<string>('');

    /* Define the event handlers for the events */
    const handleSearchTextChanged = (searchText: string): void => {
        filterBySearchText(searchText);
    }

    const handleCategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            reset();
        } else {
            const categoryId: number = event.target.value;
            filterByCategory(categoryId);
        }
        return;
    };

    const handleSubcategoryChange = (event: any): React.ChangeEventHandler<HTMLSelectElement> => {
        if (event.target.value === "initValue") {
            setSelectedSubcategory(null);
        }
        else {
            const subcategoryId: number = event.target.value;
            filterBySubcategory(subcategoryId);
        }
        return;
    }

    const breakpoints = { xs: 12, sm: 6, md: 3, lg: 3, xl: 3 };

    return (
        <Grid container spacing={1} display='flex' flexDirection='row' justifyContent={'space-between'}>

            <Grid item
                xs={breakpoints.xs}
                sm={breakpoints.sm}
                md={breakpoints.md}
                lg={breakpoints.lg}
                xl={breakpoints.xl}
                sx={gridItemStyling}
            >
                <ProductSearchBar
                    searchText={searchText}
                    setSearchText={setSearchText}
                    showSearchBar={showSearchBar}
                    onSearchTextChanged={handleSearchTextChanged}
                    style={{ width: '100%' }}
                />
            </Grid>

            <Grid item
                xs={breakpoints.xs}
                sm={breakpoints.sm}
                md={breakpoints.md}
                lg={breakpoints.lg}
                xl={breakpoints.xl}
                sx={gridItemStyling}
            >
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>{languageStore.currentLanguage.filterByCategory}</InputLabel>
                    <Select
                        value={selectedCategory ? selectedCategory.id : ''}
                        onChange={handleCategoryChange}
                        aria-label={languageStore.currentLanguage.selectCategory}
                        label={languageStore.currentLanguage.filterByCategory}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {languageStore.getCurrentLanguageCode() === "da-DK" ? category.name.split("|")[0] : category.name.split("|")[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item
                xs={breakpoints.xs}
                sm={breakpoints.sm}
                md={breakpoints.md}
                lg={breakpoints.lg}
                xl={breakpoints.xl}
                sx={gridItemStyling}
            >
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel>{languageStore.currentLanguage.filterBySubcategory}</InputLabel>
                    <Select
                        value={selectedSubcategory ? selectedSubcategory.id : ''}
                        onChange={handleSubcategoryChange}
                        aria-label={languageStore.currentLanguage.selectSubcategory}
                        label={languageStore.currentLanguage.filterBySubcategory}
                    >
                        {subcategories.map((subcategory) => (
                            <MenuItem key={subcategory.id} value={subcategory.id}>
                                {languageStore.getCurrentLanguageCode() === "da-DK" ? subcategory.name.split("|")[0] : subcategory.name.split("|")[1]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item
                xs={breakpoints.xs}
                sm={breakpoints.sm}
                md={breakpoints.md}
                lg={breakpoints.lg}
                xl={breakpoints.xl}
                sx={gridItemStyling}
            >
                <Button style={{ width: '100%', height: '50px' }} variant="contained" onClick={reset}>{languageStore.currentLanguage.reset}</Button>
            </Grid>

            <Grid item xs={12} >
                <Typography variant="body2">
                    {languageStore.currentLanguage.showing} {displayItemsCount}/{totalItemsCount} {languageStore.currentLanguage.products.toLocaleLowerCase()}
                </Typography>
            </Grid>
        </Grid >
    )
});

const gridItemStyling: React.CSSProperties = {
    minWidth: '15vw',
    width: '100%'
}


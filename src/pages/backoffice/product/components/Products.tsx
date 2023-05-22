import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { Button, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { ProductItem } from "@models/ProductItem";
import { ProductSearch } from "@components/productsearch/ProductSearch";
import Loading from "@components/loading/Loading";

type ProductsProps = {
    onProductItemClicked: (productItem: ProductItem) => void;
}

export const Products: React.FC<ProductsProps> = observer((props: ProductsProps) => {

    const { languageStore, backofficeStore } = useContext(MobXContext);
    const handleOnCreateClicked = (): void => props.onProductItemClicked(null);
    const handleOnShowMoreClicked = (): void => {
        backofficeStore.showMore();
    }

    const ProductCards = (productItems: ProductItem[]) => {
        if (productItems.length === 0) {
            return (<div style={{ marginTop: '20px' }}>Ingen produkter</div>);
        } else {
            return (
                productItems.map((product, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={2} xl={2} padding={1} display='flex' key={"BackofficeCategoryCardItem" + index}>
                            <ProductCard
                                productItem={product}
                                onProductItemClicked={props.onProductItemClicked}
                            />
                        </Grid>
                    )
                })
            )
        }
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
                    <Button style={{ width: "12rem", margin: '5px' }} variant="contained" onClick={handleOnCreateClicked}>{languageStore.currentLanguage.create}</Button>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <ProductSearch
                        showSearchBar={true}
                        reset={backofficeStore.reset}
                        searchText={backofficeStore.searchText}
                        setSearchText={backofficeStore.setSearchText}
                        categories={backofficeStore.Categories}
                        selectedCategory={backofficeStore.selectedCategory}
                        subcategories={backofficeStore.selectedSubcategories}
                        selectedSubcategory={backofficeStore.selectedSubcategory}
                        displayItemsCount={backofficeStore.displayedProductItems.length}
                        totalItemsCount={backofficeStore.totalItemsCount}
                        setSelectedSubcategory={backofficeStore.setSelectedSubcategory}
                        filterBySearchText={backofficeStore.filterBySearchText}
                        filterByCategory={backofficeStore.filterByCategory}
                        filterBySubcategory={backofficeStore.filterBySubcategory}
                    />
                </Grid>

                {/* Productcards */}
                {ProductCards(backofficeStore.displayedProductItems)}
                <Grid item xs={12} display={'flex'} justifyContent={'center'} style={{ margin: '10px' }} >
                    <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnShowMoreClicked}>{languageStore.currentLanguage.showMore}</Button>
                </Grid>
            </Grid >
        )
    }
});
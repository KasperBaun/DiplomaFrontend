import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Grid, Typography } from "@mui/material";
import ProductSearch from "@components/productsearch/ProductSearch";
import { ProductCardWeb } from "./ProductCard";
import Loading from "@components/loading/LoadingLion";

export const ProductListPage: React.FC = observer(function ProductListPage() {
    // const translater = new Translater();
    const { languageStore, webshopStore, searchStore } = useContext(MobXContext);

    /* Define the event handlers for the buttons */
    const handleOnShowMoreClicked = (): void => {
        searchStore.showMore();
    }

    const navigate = useNavigate();
    const handleOnProductClicked = (productId: number) => {
        navigate('/product/' + productId)
    }

    const ShowMoreButton: React.FC = () => {
        const moreItemsAvailableToShow = searchStore.productItems.length > 0 && searchStore.productItems.length > searchStore.displayedProductItems.length;
        if (moreItemsAvailableToShow) {
            return (
                <Grid item xs={12} display={'flex'} justifyContent={'center'} style={{ margin: '10px' }} >
                    <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnShowMoreClicked}>{languageStore.currentLanguage.showMore}</Button>
                </Grid>
            )
        } else {
            return <></>
        }
    }

    if (!webshopStore.isLoaded && !searchStore.isLoaded) {
        return <Loading />
    } else {
        return (
            <Grid container >
                <Grid item xs={12} display={'flex'} justifyContent={'center'} style={{ margin: '10px' }} >
                    <ProductSearch
                        categories={webshopStore.Categories}
                        subcategories={searchStore.selectedSubcategories}
                        showSearchBar={false}
                    />
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <Typography variant="body2">{searchStore.displayedProductItems.length} {languageStore.currentLanguage.ProductTabText}</Typography>
                </Grid>

                <Grid container  >
                    {searchStore.displayedProductItems.map((product, index) => (
                        <Grid
                            item xs={12} sm={6} md={4} lg={3} xl={3}
                            padding={1}
                            display='flex'
                            justifyContent={'center'}
                            key={"BackofficeCategoryCardItem" + index}
                            onClick={() => handleOnProductClicked(product.id)}
                        >
                            <ProductCardWeb data={product} />
                        </Grid>
                    ))}
                </Grid>
                <ShowMoreButton />
            </Grid >
        )
    }
});




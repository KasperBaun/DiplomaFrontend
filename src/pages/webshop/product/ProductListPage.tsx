import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Translater } from "@utils/Translater";
import { ProductItemWeb } from "@models/ProductItemWeb";
import Loading from "@components/loading/Loading";
import { Button, Grid, Typography } from "@mui/material";
import ProductSearch from "@components/productsearch/ProductSearch";
import { ProductCardWeb } from "./ProductCard";
import { ExtentionMethods } from "@utils/ExtentionMethods";


export const ProductListPage: React.FC = observer(function ProductListPage() {
    const translater = new Translater();
    const { languageStore, webshopStore } = useContext(MobXContext);

    /* Define state for products and inject stores */
    const pageSizeAmount: number = 10;
    const [productItems, setProductItems] = useState<ProductItemWeb[]>(webshopStore.productItems);
    const [displayedProductItems, setDisplayedProductItems] = useState<ProductItemWeb[]>(productItems.slice(0, pageSizeAmount))
    const [currentDisplayValue, setCurrentDisplayValue] = useState<number>(1);

    /* Define the event handlers for the buttons */
    const updateDisplayedProductItems = (productItems: ProductItemWeb[], amount: number) => {
        setDisplayedProductItems(ExtentionMethods.safeSlice(productItems, 0, amount * pageSizeAmount));
    }

    const handleItemsChanged = (productItems: ProductItemWeb[] | ProductItemWeb[]) => {
        const items: ProductItemWeb[] = productItems as ProductItemWeb[];
        updateDisplayedProductItems(items, 1);
        setProductItems(items);
    }

    const handleOnShowMoreClicked = (): void => {
        updateDisplayedProductItems(productItems, currentDisplayValue + 1);
        setCurrentDisplayValue(currentDisplayValue + 1);
    }


    if (!webshopStore.isLoaded) {
        return <Loading />
    } else {
        return (
            <Grid container >
                <Grid item xs={12} display={'flex'} justifyContent={'start'} >
                    <Typography variant="h4">{languageStore.currentLanguage.ProductTabText}</Typography>
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <ProductSearch
                        categories={webshopStore.Categories}
                        subcategories={webshopStore.subCategories}
                        items={webshopStore.productItems}
                        onItemsChanged={handleItemsChanged}
                        showSearchBar={true}
                    />
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <Typography variant="body2">{displayedProductItems.length} {languageStore.currentLanguage.ProductTabText}</Typography>
                </Grid>

                {/* Productcards */}
                {ProductCards(displayedProductItems)}

                <Grid item xs={12} display={'flex'} justifyContent={'center'} style={{ margin: '10px' }} >
                    <Button style={{ width: "12rem", marginRight: '10px', minWidth: '15vw' }} variant="contained" onClick={handleOnShowMoreClicked}>{languageStore.currentLanguage.showMore}</Button>
                </Grid>
            </Grid >
        )
    }


});


const ProductCards = (productItems: ProductItemWeb[]) => {
    const navigate = useNavigate();
    const handleOnProductClicked = (productId: number) => {
        navigate('/product/' + productId)
    }

    if (productItems.length === 0) {
        return (<div style={{ marginTop: '20px' }}>Ingen produkter</div>);
    } else {
        return (
            productItems.map((product, index) => {
                // console.log(toJS(product))
                return (
                    <Grid
                        item xs={12} sm={6} md={4} lg={3} xl={3}
                        padding={1}
                        display='flex'
                        key={"BackofficeCategoryCardItem" + index}
                        onClick={() => handleOnProductClicked(product.id)}
                    >
                        <ProductCardWeb data={product} />
                    </Grid>
                )
            })
        )
    }
}


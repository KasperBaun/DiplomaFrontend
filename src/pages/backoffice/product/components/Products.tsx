import { observer } from "mobx-react-lite";
import MobXContext from "@stores/MobXContext";
import { useContext, useState } from "react";
import LoadingLion from "@components/loading/LoadingLion";
import { Button, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import { ProductItem } from "@models/ProductItem";
import ProductSearch from "@components/productsearch/ProductSearch";
import { ExtentionMethods } from "@utils/ExtentionMethods";

export type IProductsProps = {
    onProductItemClicked: (productItem: ProductItem) => void;
}

const Products: React.FC<IProductsProps> = observer(function Products(props: IProductsProps) {

    /* Define state for products and inject stores */
    const pageSizeAmount: number = 10;
    const { languageStore, backofficeStore } = useContext(MobXContext);
    const [productItems] = useState<ProductItem[]>(backofficeStore.ProductItems);
    const [displayedProductItems, setDisplayedProductItems] = useState<ProductItem[]>(productItems.slice(0, pageSizeAmount))
    const [currentDisplayValue, setCurrentDisplayValue] = useState<number>(1);

    /* Define the event handlers for the buttons */
    const updateDisplayedProductItems = (productItems: ProductItem[], amount: number) => {
        setDisplayedProductItems(ExtentionMethods.safeSlice(productItems, 0, amount * pageSizeAmount));
    }

    const handleOnCreateClicked = (): void => props.onProductItemClicked(null);

    const handleOnShowMoreClicked = (): void => {
        updateDisplayedProductItems(productItems, currentDisplayValue + 1);
        setCurrentDisplayValue(currentDisplayValue + 1);
    }

    const ProductCards = (productItems: ProductItem[]) => {
        if (productItems.length === 0) {
            return (<div style={{ marginTop: '20px' }}>Ingen produkter</div>);
        } else {
            return (
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
            )
        }
    }

    if (!backofficeStore.isLoaded) {
        return (
            <LoadingLion />
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
                        categories={backofficeStore.Categories}
                        subcategories={backofficeStore.subCategories}
                        onProductItemClicked={props.onProductItemClicked}
                        showSearchBar={true}
                    />
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'start'} style={{ margin: '10px' }} >
                    <Typography variant="body2">{displayedProductItems.length} {languageStore.currentLanguage.ProductTabText.toLowerCase()}</Typography>
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

export default Products;


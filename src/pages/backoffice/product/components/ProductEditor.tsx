import { ConfirmDeleteDialog } from "@backoffice/category/components/ConfirmDeleteDialog";
import { ProductItem } from "@models/ProductItem";
import { ProductDetails } from "./ProductDetails";
import { ImageGallery } from "@webshop/product/ImageGallery";
import MobXContext from "@stores/MobXContext";
import { Alert, Button, Container, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Paper, Snackbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Product } from "@models/Product";
import { observer } from "mobx-react-lite";
import { LanguageStore } from "@stores/LanguageStore";
import { Constants } from "@utils/Constants";
import { toJS } from "mobx";
import { Delete } from "@mui/icons-material";
import { SubCategory } from "@models/SubCategory";
import { Image } from "@models/Image";

type ProductEditorProps = {
    productItem?: ProductItem;
    create?: boolean;
    copy?: boolean;
}

export const ProductEditor: React.FC<ProductEditorProps> = observer((props: ProductEditorProps) => {

    /* Define state for modals */
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");
    const [alertMessage, setAlertMessage] = useState<string>("");

    /* Define state for product and selected category & subcategory - Inject stores */
    const { languageStore, backofficeStore } = useContext(MobXContext);
    const productItem = configureProductItem(props.create, props.copy, props.productItem);


    const handleOnConfirmDeleteClick = async () => {
        const deleted = await backofficeStore.deleteProductItem(props.productItem.id);
        if (deleted) {
            setAlertType("success");
            setAlertMessage(languageStore.currentLanguage.deleteSuccess);
        } else {
            setAlertType("warning");
            setAlertMessage(languageStore.currentLanguage.deleteFailed);
        }
        setShowSnackbar(true);
        setShowConfirmDelete(false);
    }

    const handleOnDeleteClick = async () => {
        setShowConfirmDelete(true);
    }

    const handleOnUpdateClicked = () => {
        var updated = true;
        if (updated) {
            setAlertType("success");
            setAlertMessage(languageStore.currentLanguage.updateSuccess);
        } else {
            setAlertType("warning");
            setAlertMessage(languageStore.currentLanguage.updateFailed);
        }
        setShowSnackbar(true);
    };

    const handleOnSubcategoryDeleteClicked = (subcategory: SubCategory) => {
        productItem.product.subcategories = productItem.product.subcategories.filter((subcat) => subcat.id !== subcategory.id);
    }

    return (
        <Grid container>
            <ConfirmDeleteDialog visible={showConfirmDelete} objectName={productItem.product.name} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
                <Alert severity={alertType}>{alertMessage}</Alert>
            </Snackbar>

            <Container component="main" maxWidth="lg" >
                <Paper variant="outlined" >

                    <Grid container padding={1} justifyContent={'center'} >

                        <Grid item xs={12} md={12} >
                            <Headline copy={props.copy} create={props.create} languageStore={languageStore} productItem={productItem} color={Constants.primaryColor} />
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <ImageGallery imageURLs={productItem.images.map(i => i.url)} />
                            {/* <ProductImages images={productItem.images} /> */}
                        </Grid>

                        <Grid item xs={12} md={6} >
                            <ProductDetails productItem={productItem} />
                        </Grid>

                        <Grid item xs={12} padding={2}>
                            <ImageList sx={{ width: 500, height: 450 }}>
                                {productItem.product.subcategories.map((item) => {
                                    const imgUrl = item.imageUrl ? item.imageUrl : '';
                                    return (
                                        <ImageListItem key={item.id}>
                                            <img
                                                src={`${imgUrl}?w=248&fit=crop&auto=format`}
                                                srcSet={`${imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.name}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={item.name}
                                                subtitle={item.name}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${item.name}`}
                                                        onClick={() => handleOnSubcategoryDeleteClicked(item)}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    )
                                })}
                            </ImageList>
                        </Grid>

                        <Grid item xs={12} md={12} display={'flex'} justifyContent={'space-between'} paddingTop={2} >
                            <Button variant="contained" onClick={() => console.log(toJS(productItem.product))} > Print </Button>
                            {!props.create &&
                                <Button variant="contained" onClick={handleOnDeleteClick} > {languageStore.currentLanguage.delete} </Button>
                            }
                            <Button variant="contained" onClick={handleOnUpdateClicked} > {languageStore.currentLanguage.update} </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Grid >
    );
});

const configureProductItem = (create?: boolean, copy?: boolean, productItemFromProps?: ProductItem): ProductItem => {

    let product: Product = new Product();
    const subcategories = productItemFromProps?.product?.subcategories ? productItemFromProps.product.subcategories : [];
    if (create) {
        product.id = 0;
        product.name = "";
        product.modelNumber = "";
        product.manufacturer = "";
        product.material = null;
        product.design = "";
        product.dimension = "";
        product.subcategories = subcategories;
    } else {
        product = productItemFromProps.product;
    }

    product.subcategories = subcategories;

    let productItem: ProductItem = new ProductItem();
    let id: number = create ? 0 : copy ? 0 : productItemFromProps.id;
    let images: Image[] = create ? [] : productItemFromProps.images ? productItemFromProps.images : [];
    productItem.id = id;
    productItem.productId = product.id;
    productItem.product = product;
    productItem.condition = create ? null : productItemFromProps.condition;
    productItem.quality = create ? null : productItemFromProps.quality;
    productItem.sold = (create || copy) ? false : productItemFromProps.sold;
    productItem.weight = create ? 0 : productItemFromProps.weight;
    productItem.customText = create ? '' : productItemFromProps.customText;
    productItem.purchasePrice = create ? 0 : productItemFromProps.purchasePrice;
    productItem.currentPrice = create ? 0 : productItemFromProps.currentPrice;
    productItem.createdDate = (create || copy) ? new Date() : productItemFromProps.createdDate;
    productItem.soldDate = (create || copy) ? null : productItemFromProps.soldDate;
    productItem.images = images;
    productItem.priceHistories = create ? [] : productItemFromProps.priceHistories;

    return productItem;
}

const Headline: React.FC<{ create: boolean, copy: boolean, productItem: ProductItem, languageStore: LanguageStore, color?: string }> = (props) => {
    if (props.create || props.copy) {
        return <Typography component="h1" variant="h4" align="center" color={props.color ? props.color : ''}>{props.languageStore.currentLanguage.createProduct}</Typography>;
    }
    return <Typography component="h1" variant="h4" align="center" color={props.color ? props.color : ''}>{props.languageStore.currentLanguage.editProduct}</Typography>;
};

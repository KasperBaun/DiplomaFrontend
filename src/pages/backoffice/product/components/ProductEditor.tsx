import ConfirmDeleteDialog from "@backoffice/category/components/ConfirmDeleteDialog";
import { materialType } from "@models/Enums";
// import PriceHistory from "@models/PriceHistory";
import ProductItem from "@models/ProductItem";
// import SubCategory from "@models/SubCategory";
// import Image from "@models/Image";
import { Alert, Box, Grid, Link, Paper, Snackbar, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { useContext, useState } from "react";
import Product from "@models/Product";
import { observer } from "mobx-react-lite";

export interface IProductEditorProps {
    productItem?: ProductItem;
    create?: boolean;
    copy?: boolean;
}

const ProductEditor: React.FC<IProductEditorProps> = observer(function ProductEditor(props: IProductEditorProps) {

    const { languageStore, backofficeStore } = useContext<IMobXContext>(MobXContext);

    /* Define state for modals */
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"success" | "error" | "warning" | "info">("success");

    const handleOnConfirmDeleteClick = async () => {
        const deleted = await backofficeStore.deleteProductItem(props.productItem.id);
        if (deleted) {
            setAlertType("success");
        } else {
            setAlertType("warning");
        }
        setShowSnackbar(true);
        setShowConfirmDelete(false);
    }

    // const handleOnDeleteClick = async () => {
    //     setShowConfirmDelete(true);
    // }


    // const handleOnUpdateClicked = () => {
    //     // Open update modal / page
    // };

    const productItem = configureProductItem(props.create, props.copy, props.productItem);
    const imageUrl: string = productItem?.images[0]?.url ? productItem.images[0].url : "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80";

    /* States for each property in Product & ProductItem */
    // const [productId, setProductId] = useState<number>(productItem.product.id);
    const [name, setName] = useState<string>(productItem.product.name);
    // const [manufacturer, setManufacturer] = useState<string>(productItem.product.manufacturer);
    const [material, setMaterial] = useState<materialType>(productItem.product.material);
    const [design, setDesign] = useState<string>(productItem.product.design);
    // const [dimension, setDimension] = useState<string>(productItem.product.dimension);
    // const [subcategories, setSubcategories] = useState<SubCategory[]>(productItem.product.subcategories);

    // const [Id, setId] = useState<number>(productItem.id);
    // const [condition, setCondition] = useState<conditionType>(productItem.condition);
    // const [quality, setQuality] = useState<qualityType>(productItem.quality);
    // const [sold, setSold] = useState<boolean>(productItem.sold);
    // const [weight, setWeight] = useState<number>(productItem.weight);
    // const [customText, setCustomText] = useState<string>(productItem.customText);
    // const [purchasePrice, setPurchasePrice] = useState<number>(productItem.purchasePrice);
    // const [currentPrice, setCurrentPrice] = useState<number>(productItem.currentPrice);
    // const [createdDate, setCreatedDate] = useState<Date>(productItem.createdDate);
    // const [soldDate, setSoldDate] = useState<Date | null>(productItem.soldDate);
    // const [images, setImages] = useState<Image[]>(productItem.images);
    // const [priceHistories, setPriceHistories] = useState<PriceHistory[] | null>(productItem.priceHistories);

    return (
        <Grid container>
            <ConfirmDeleteDialog visible={showConfirmDelete} objectName={productItem.product.name} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
                <Alert severity={alertType}>{alertType === "success" ? languageStore.currentLanguage.deleteCategorySuccessMessage : languageStore.currentLanguage.deleteCategoryFailedMessage}</Alert>
            </Snackbar>

            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${imageUrl})`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: 'none' }} src={imageUrl} alt={"Background image for producteditor page"} />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {name}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {design}
                            </Typography>
                            <Link variant="subtitle1" href="#">
                                {material}
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>


        </Grid>
    );
});

export default ProductEditor;

const configureProductItem = (create?: boolean, copy?: boolean, productItemFromProps?: ProductItem): ProductItem => {
    if (!productItemFromProps) {
        console.log("Fail");
    }

    let product: Product = new Product();
    if (create) {
        product.id = 0;
        product.name = "";
        product.modelNumber = "";
        product.manufacturer = "";
        product.material = null;
        product.design = "";
        product.dimension = "";
        product.subcategories = [];
    } else {
        product = productItemFromProps.product;
    }

    let productItem: ProductItem = new ProductItem();
    let id: number = create ? 0 : copy ? 0 : productItemFromProps.id;
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
    productItem.images = create ? [] : productItemFromProps.images;
    productItem.priceHistories = create ? [] : productItemFromProps.priceHistories;

    return productItem;
}
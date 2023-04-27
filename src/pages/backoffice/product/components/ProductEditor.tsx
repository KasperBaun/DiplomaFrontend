import ConfirmDeleteDialog from "@backoffice/category/components/ConfirmDeleteDialog";
import ProductItem from "@models/ProductItem";
import { Alert, Grid, Snackbar, Typography } from "@mui/material";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { useContext, useState } from "react";

export interface IProductEditorProps {
    productItem?: ProductItem;
}

const ProductEditor: React.FC<IProductEditorProps> = function ProductEditor(props: IProductEditorProps) {

    const { languageStore, backofficeStore } = useContext<IMobXContext>(MobXContext);

    /* Define state for modals */
    const [showProductDialog, setShowProductDialog] = useState<boolean>(false);
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

    const handleOnDeleteClick = async () => {
        setShowConfirmDelete(true);
    }


    const handleOnUpdateClicked = () => {
        // Open update modal / page
    };



    const { productItem } = props;
    const [name, setName] = useState<string>(productItem ? productItem.product.name : '');

    const [manufacturer, setManufacturer] = useState<string>(productItem ? productItem.product.manufacturer : '');
    const [price, setPrice] = useState<number>(productItem ? productItem.currentPrice : 0);

    return (
        <Grid container>
            <ConfirmDeleteDialog visible={showConfirmDelete} objectName={props.productItem ? props.productItem.product.name : ''} onConfirmDeleteClicked={handleOnConfirmDeleteClick} onCancelClicked={() => setShowConfirmDelete(false)} />
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={showSnackbar} autoHideDuration={2000} onClose={() => setShowSnackbar(false)}>
                <Alert severity={alertType}>{alertType === "success" ? languageStore.currentLanguage.deleteCategorySuccessMessage : languageStore.currentLanguage.deleteCategoryFailedMessage}</Alert>
            </Snackbar>
            
            <Grid item xs={12}>
                <Typography variant="h1" component="h2" gutterBottom>
                    {name}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h2" component="h2" gutterBottom>
                    {manufacturer}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" component="h2" gutterBottom>
                    {price}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ProductEditor;
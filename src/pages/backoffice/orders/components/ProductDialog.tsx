import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LanguageStore } from "@stores/LanguageStore";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "@webshop/product/ImageGallery";
import ProductDescription from "@webshop/product/ProductDescription";
import { useContext, useState } from "react";

interface IProps {
    id: number;
    open: boolean;
    onClose: () => void;
    ls : LanguageStore;
}

const ProductDialog = ( props : IProps ) => {
    const { productStore } = useContext(MobXContext);
    const product = (productStore.getProductItem(Number(props.id)));
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    if (product) {
        return (
            <Dialog open={props.open} onClose={props.onClose}
            maxWidth="lg"
            sx={{ minWidth: '60rem' }}>
              <DialogTitle>{product.product.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <ImageGallery key={"productImgGal" + product.id} imageURLs={product.images} />
                  </Grid>
                  <Grid item lg={6}>
                    <ProductDescription key={"productDes" + product.id} Iproduct={product} />
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            );
        }
}

export default ProductDialog;
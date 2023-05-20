import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LanguageStore } from "@stores/LanguageStore";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "@webshop/product/ImageGallery";
import { useContext } from "react";

interface IProps {
    id: number;
    open: boolean;
    onClose: () => void;
    ls : LanguageStore;
}

const ProductDialog = ( props : IProps ) => {
    const { backofficeStore } = useContext(MobXContext);
    const product = (backofficeStore.getProductItem(Number(props.id)));

    if (product) {
        return (
            <Dialog open={props.open} onClose={props.onClose}
            maxWidth="lg"
            sx={{ minWidth: '60rem' }}>
              <DialogTitle>{product.product.name}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <ImageGallery key={"productImgGal" + product.id} imageURLs={product.images.map(img => img.url)} />
                  </Grid>
                  <Grid item lg={6}>
                    {/* <ProductDescription source={"backoffice"} key={"productDes" + product.id} Iproduct={product} /> */}
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
            );
        }
}

export default ProductDialog;
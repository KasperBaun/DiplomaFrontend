import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { LanguageStore } from "@stores/LanguageStore";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

type ProductDialogProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  ls: LanguageStore;
}

export const ProductDialog = observer((props: ProductDialogProps) => {
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
              <img src={product.images[0].url} alt={product.product.name} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
});
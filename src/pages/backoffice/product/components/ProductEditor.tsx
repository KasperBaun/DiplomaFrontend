import ProductItem from "@models/ProductItem";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

export interface IProductEditorProps {
    productItem?: ProductItem;
}

const ProductEditor: React.FC<IProductEditorProps> = function ProductEditor(props: IProductEditorProps) {

    const { productItem } = props;
    const [name, setName] = useState<string>(productItem ? productItem.product.name : '');

    const [manufacturer, setManufacturer] = useState<string>(productItem ? productItem.product.manufacturer : '');
    const [price, setPrice] = useState<number>(productItem ? productItem.currentPrice : 0);

    return (
        <Grid container>
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
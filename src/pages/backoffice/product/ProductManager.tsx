import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Products from "./Products";
import ProductItem from "@models/ProductItem";
import ProductEditor from "./components/ProductEditor";

export interface IProductManagerProps {

}

const ProductManager: React.FC<IProductManagerProps> = observer(function ProductManager(props: IProductManagerProps) {

    const { languageStore } = useContext(MobXContext);
    const [selectedProductItem, setSelectedProductItem] = useState<ProductItem | null>(null);
    const [activeKey, setActiveKey] = useState<number>(0);

    const navSwitch = (activeKey: number) => {
        switch (activeKey) {
            case 0: return <Products />;
            case 1: return <ProductEditor productItem={selectedProductItem} />;
        }
    }

    const handleOnProductItemClicked = (productItem: ProductItem) => {
        setSelectedProductItem(productItem);
        setActiveKey(1);
    }

    const handleOnProductsClicked = () => {
        setSelectedProductItem(null);
        setActiveKey(1);
    }


    return (
        <Grid container>
            {/* Navigation */}
            <Grid item xs={12} margin='10px'>
                <Breadcrumbs separator={<NavigateNext fontSize="large" />} aria-label="breadcrumb">
                    <Link onClick={() => setActiveKey(0)} underline={activeKey === 0 ? "always" : "hover"}>
                        <Typography variant="h3">
                            {languageStore.currentLanguage.ProductTabText}
                        </Typography>
                    </Link>
                    <Link onClick={handleOnProductsClicked} underline={activeKey === 1 ? "always" : "hover"}>
                        <Typography variant="h3">
                            {languageStore.currentLanguage.product}
                        </Typography>
                    </Link>
                </Breadcrumbs>
            </Grid>

            {/* Display Products or ProductEditor */}
            <Grid item xs={12} display={'flex'} justifyContent={'space-between'} margin='10px'>
                {navSwitch(activeKey)}
            </Grid>
        </Grid>
    );
});

export default ProductManager;
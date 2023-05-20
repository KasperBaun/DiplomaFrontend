import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import MobXContext from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import Products from "./components/Products";
import { ProductItem } from "@models/ProductItem";
import ProductEditor from "./components/ProductEditor";
import Loading from "@components/loading/LoadingLion";

const ProductManager: React.FC = observer(function ProductManager() {

    const { languageStore, backofficeStore } = useContext(MobXContext);
    const [selectedProductItem, setSelectedProductItem] = useState<ProductItem | null>(null);
    const [activeKey, setActiveKey] = useState<number>(0);
    const [create, setCreate] = useState<boolean>(false);
    // const [copy, setCopy] = useState<boolean>(false);

    const navSwitch = (activeKey: number) => {
        switch (activeKey) {
            case 0: return <Products onProductItemClicked={handleOnProductItemClicked} />;
            case 1: return <ProductEditor productItem={selectedProductItem} create={create} />;
        }
    }

    const handleOnProductItemClicked = (productItem: ProductItem) => {
        if (productItem === null) {
            setCreate(true);
            setSelectedProductItem(productItem);
        } else {
            setCreate(false);
            setSelectedProductItem(productItem);
        }

        setActiveKey(1);
    }

    if (backofficeStore.isLoaded === false) {
        return <Loading />;
    } else {

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
                        <Link onClick={() => handleOnProductItemClicked(null)} underline={activeKey === 1 ? "always" : "hover"}>
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
    }
});

export default ProductManager;
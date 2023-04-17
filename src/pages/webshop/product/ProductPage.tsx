import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "./ImageGallery";
import "./ProductPage.scss";
import { useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";
import {  Grid } from "@mui/material";


interface IProductPageProps {
}

const ProductPage: React.FC<IProductPageProps> = observer(function ProductPage(props: IProductPageProps) {

    let { id } = useParams();
    const { productStore } = useContext(MobXContext);
    const product = (productStore.getProductItem(Number(id)));

    if (product) {
        return (
          <Grid container spacing={2}>
            <Grid item lg={6}>
            <ImageGallery key={"productImgGal"+product.id} imageURLs={product.images} />

            </Grid>
            <Grid item lg={6}>

            <ProductDescription key={"productDes"+product.id} Iproduct={product} />
            </Grid>
          </Grid>
          );
        }

 });

export default ProductPage;
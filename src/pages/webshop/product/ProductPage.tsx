import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "./ImageGallery";
import "./ProductPage.scss";
import { useParams } from "react-router-dom";

interface IProductPageProps {
}

const ProductPage: React.FC<IProductPageProps> = observer(function ProductPage(props: IProductPageProps) {

    let { id } = useParams();
    const { productStore } = useContext(MobXContext);
    const product = (productStore.getProductItem(Number(id)));


    // useEffect(() => {
    //     // make store->api call here.. await fetch
    //     const getProductModel = async () => {
    //         try {
    //             //setProduct(await productStore.getProduct(props.productId));

    //         }
    //         catch (err) {
    //             console.error(err);
    //         }
    //     }

    //     // update setProduct
    //     getProductModel();
    // }, [productStore, props.productId])

    if (product) {
        return (
            <div>
                <h1>Product Page</h1>
                {/* // Små billeder (mulighed for at browse) */}

                {/* // Stort billede */}
                <ImageGallery key={"productImgGal"+product.id} imageURLs={product.images} />

                {/* // Beskrivelseskomponent */}
                <p>Name: {product.product.name}</p>
                <p>Condition: {product.condition}</p>
            </div >

        )

    } else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default ProductPage;
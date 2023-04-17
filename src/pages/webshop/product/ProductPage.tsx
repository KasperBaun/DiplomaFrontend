import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "./ImageGallery";
import "./ProductPage.scss";
import { useParams } from "react-router-dom";
import ProductDescription from "./ProductDescription";

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
              <div style={{ display: 'flex' }}>
                <div style={{ width: '50%' }}>
                  <ImageGallery key={"productImgGal"+product.id} imageURLs={product.images} />
                </div>
                <div style={{ width: '50%' }}>
                  <ProductDescription key={"productDes"+product.id} Iproduct={product} />
                </div>
              </div>
              {/* add additional divs here for table rows and cells */}
          </div>
          );
        }

 });

export default ProductPage;
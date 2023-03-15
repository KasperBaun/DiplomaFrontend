import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "./ImageGallery";
import "./ProductPage.scss";

interface IProductPageProps {
    productId: number;
}

const ProductPage: React.FC<IProductPageProps> = observer(function ProductPage(props: IProductPageProps) {

    const { productStore } = useContext(MobXContext);

    const [product, setProduct] = useState<Product>(null);

    useEffect(() => {
        // make store->api call here.. await fetch
        const getProductModel = async () => {
            try {
                setProduct(await productStore.getProduct(props.productId));

            }
            catch (err) {
                console.error(err);
            }
        }

        // update setProduct
        getProductModel();
    }, [productStore, props.productId])

    if (product) {
        return (
            <div>
            {/* // Små billeder (mulighed for at browse) */}

            {/* // Stort billede */}
            <ImageGallery key={"productImgGal"+product.id} imageURLs={product.imageUrls} />

            {/* // Beskrivelseskomponent */}
                <h1>ProductPage</h1>
                <p>Name: {product.name}</p>
               {/*<p>Condition: {product.condition}</p>*/}
            </div >

        )

    } else {
    return (
        <h1>Loading...</h1>
    )
}

});

export default ProductPage;
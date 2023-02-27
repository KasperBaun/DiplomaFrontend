import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import ImageGallery from "./ImageGallery";
import "./productStyles.scss";
import { useParams } from "react-router";

const ProductPage: React.FC = observer(function ProductPage() {

    const { productStore, languageStore } = useContext(MobXContext);
    const { productID } = useParams();
    const [product, setProduct] = useState<Product>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // make store->api call here.. await fetch
        const getProductModel = async () => {
            try {
                const response = await productStore.getProduct(productID ? Number.parseInt(productID) : 1)
                if (response === null) {
                    setLoading(false);
                } else {
                    setProduct(response);
                    setLoading(false);
                }

            }
            catch (err) {
                console.error(err);
            }
        }

        // update setProduct
        getProductModel();
    }, [])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    else if (!loading && !product) {
        return (
            <h1>Error loading product.. please try again</h1>
        )
    }
    else if (!loading && product) {
        return (
            <div>
                {/* // Små billeder (mulighed for at browse) */}

                {/* // Stort billede */}
                <ImageGallery key={"productImgGal" + product.id} imageURLs={product.imageUrls} />

                {/* // Beskrivelseskomponent */}
                <h1>ProductPage</h1>
                <p>{languageStore.currentLanguage.productName}: {product.name}</p>
                <p>{languageStore.currentLanguage.productCondition}: {product.condition}</p>
            </div >

        )

    }
});

export default ProductPage;
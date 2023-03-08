import { observer } from "mobx-react-lite"
import Product from "@models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "@stores/MobXContext";
import "./productStyles.scss";
import { useParams } from "react-router";
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';

// ImageGallery from https://github.com/xiaolin/react-image-gallery

const ProductPage: React.FC = observer(function ProductPage() {

    const { productStore, languageStore } = useContext(MobXContext);
    const { productID } = useParams();
    const [product, setProduct] = useState<Product>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     // make store->api call here.. await fetch
    //     const getProductModel = async () => {
    //         try {
    //             const response = await productStore.getProduct(productID ? Number.parseInt(productID) : 1)
    //             if (response === null) {
    //                 setLoading(false);
    //             } else {
    //                 setProduct(response);
    //                 setLoading(false);
    //             }

    //         }
    //         catch (err) {
    //             console.error(err);
    //         }
    //     }

        // update setProduct
    //     getProductModel();
    // }, [])

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
                <ImageGallery key={"productImgGal" + product.id} items={mapImgUrlToReactImageGalleryItem(product.imageUrls)} />

                {/* // Beskrivelseskomponent */}
                <h1>ProductPage</h1>
                <p>{languageStore.currentLanguage.productPage_productName}: {product.name}</p>
                <p>{languageStore.currentLanguage.productPage_productCondition}: {product.condition}</p>
                <p>{languageStore.currentLanguage.productPage_productDesign}: {product.design}</p>
            </div >

        )

    }
});

function mapImgUrlToReactImageGalleryItem(imageUrls: string[]): ReactImageGalleryItem[] {
    const imageGalleryItems: ReactImageGalleryItem[] = [];
    for (const url of imageUrls) {
        imageGalleryItems.push(
            {
                original: url,
                thumbnail: url
            }
        );
    }
    return imageGalleryItems;
}

export default ProductPage;
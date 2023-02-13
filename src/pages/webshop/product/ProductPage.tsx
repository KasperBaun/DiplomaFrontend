import { observer } from "mobx-react-lite"
import Product from "../../../models/Product";
import { useContext, useEffect, useState } from "react";
import MobXContext from "../../../stores/MobXContext";

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
    }, [])

    if (product) {
        return (
            // Små billeder (mulighed for at browse)

            // Stort billede

            // Beskrivelseskomponent
            <div>
                <h1>ProductPage</h1>
                <p>Name: {product.name}</p>
                <p>Condition: {product.condition}</p>
            </div>
        )

    } else {
        return (
            <h1>Loading...</h1>
        )
    }

});

export default ProductPage;
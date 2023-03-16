import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext } from "react";
import ProductItemWEB from "@models/webShop/ProductItemWEB";
import MyCard from "./ProductCard";

export interface IProductPageProps {
    items?: ProductItemWEB[];
}


const ProductListPage: React.FC<IProductPageProps> = observer(function ProductListPage(props: IProductPageProps) {

    const { productStore } = useContext(MobXContext);

    function createProductLit(productItems: ProductItemWEB[]): JSX.Element {
        return (
            <div>
                <ul >
                    {productItems.map(podItem => {
                        return (
                            <MyCard data={podItem} />
                        )
                    })}
                </ul>
            </div>
        )
    }

    if (props.items) {
        return (
            createProductLit(props.items)
        )
    }
    else {
        return (
            createProductLit(productStore.ProductItemDTOs)
        )
    }

});
export default ProductListPage;
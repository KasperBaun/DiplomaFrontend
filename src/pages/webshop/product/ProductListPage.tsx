import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";

//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext } from "react";
import ProductItem from "@models/ProductItem";

export interface IProductPageProps {
    items? : ProductItem[];
}


const ProductListPage: React.FC<IProductPageProps> = observer(function ProductListPage(props: IProductPageProps) {

    const { productStore } = useContext(MobXContext);

    function createProductLit(productItems : ProductItem[]) : JSX.Element{
        return (
            <div>
                <ul > 
                {productItems.map(podItem=> {
                  return(
                    <li key={podItem.id+"!"}>
                        {productStore.getProduct(podItem.productId).name}
                        {podItem.currentPrice}
                    </li>
                  ) 
                })}
                </ul>
            </div>
        ) 
    }

    if (props.items){
        return (
            createProductLit(props.items)
        ) 
    }
    else {
        return (
            createProductLit(productStore.ProductItems)
        ) 
    }

});
export default ProductListPage;
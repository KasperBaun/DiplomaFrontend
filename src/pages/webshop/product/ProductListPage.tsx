import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext } from "react";
import MyCard from "./ProductCard";
import { useNavigate } from "react-router-dom"
import ProductItem from "@models/ProductItem";


export interface IProductPageProps {
    items?: ProductItem[];
}


const ProductListPage: React.FC<IProductPageProps> = observer(function ProductListPage(props: IProductPageProps) {

    const { productStore } = useContext(MobXContext);
    const navigate = useNavigate();

    function handleClick(product: ProductItem) {
    navigate('/product/' + product.id)
    }

    function createProductLit(productItems: ProductItem[]): JSX.Element {
        return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {productItems.map(podItem => {
                        return (
                            <div onClick={() => handleClick(podItem)}>
                                <MyCard data={podItem}/>
                            </div>
                        )
                    })}
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
            createProductLit(productStore.ProductItems)
        )
    }

});
export default ProductListPage;
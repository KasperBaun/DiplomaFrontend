import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext, useState } from "react";
import MyCard from "./ProductCard";
import { useNavigate, useParams } from "react-router-dom"
import ProductItem from "@models/ProductItem";


const ProductListPage: React.FC = function ProductListPage() {

    //let { id } = useParams();
    const [items, setItems] = useState<ProductItem[]>([]);

    const { productStore, subCategoryStore } = useContext(MobXContext);
   // const navigate = useNavigate();
    let subcategory;

     function handleClick(product: ProductItem) {
    //     navigate('/product/' + product.id)
     }

    if (subcategory) {
        console.log("!")
        setItems(productStore.ProductFilteredItems);
    }

    else {
        setItems(productStore.ProductItems);
    }

    if (items.length > 0){
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.map(podItem => {
                    return (
                        <div key= {"ProductList" + podItem.id}  onClick={() => handleClick(podItem)}>
                            <MyCard data={podItem} />
                        </div>
                    )
                })}
            </div>
        )
    }
    else return <div> Yo nothing here </div>
};
export default ProductListPage;
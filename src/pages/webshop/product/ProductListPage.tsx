import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext, useState } from "react";
import MyCard from "./ProductCard";
import { useNavigate, useParams } from "react-router-dom"
import ProductItem from "@models/ProductItem";


const ProductListPage: React.FC = observer(function ProductListPage() {

    const { productStore, subCategoryStore } = useContext(MobXContext);
    const { id } = useParams();
    console.log(id);
    //const items: ProductItem[] = filteredItems;
    let items = productStore.ProductFilteredItems;
    const [loaded, setLoaded] = useState<boolean>(false);

    const navigate = useNavigate();
    //let title: string;
    if (id !== undefined) {
        //     //console.log("!");
        //     //const subCategoryId = Number.parseInt(id);
        //     //const subcategory = subCategoryStore.getSubcategory(subCategoryId);
        //     //title = subcategory.name;
        //     //const filteredItems = productStore.filterProductItemsBySubcategory(subcategory);
        //     //items = filteredItems;
        setLoaded(true);

    }
    // else {
    // items = productStore.ProductItems;
    // }



    function handleClick(product: ProductItem) {
        //     navigate('/product/' + product.id)
    }


    if (loaded) {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* <h1>{title}</h1> */}
                {items.map(podItem => {
                    return (
                        <div key={"ProductList" + podItem.id} onClick={() => handleClick(podItem)}>
                            <MyCard data={podItem} />
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div> Yo nothing here </div>
        )
    }
});

export default ProductListPage;
import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
//import { Product } from "@models/Product"; 
//import { ProductItem } from "@models/ProductItem"; 
import { useContext, useEffect, useState } from "react";
import MyCard from "./ProductCard";
import { useNavigate, useParams } from "react-router-dom"
import ProductItem from "@models/ProductItem";
import Loading from "@components/loading/Loading";





const ProductListPage: React.FC = observer(function ProductListPage() {

    let { id } = useParams();
    const subcategoryId = Number.parseInt(id);
    const { productStore, subCategoryStore } = useContext(MobXContext);
    const navigate = useNavigate();
    const [items, setItems] = useState<ProductItem[]>(null);
    const [subcategoryTitle, setSubcategoryTitle] = useState<string>("");

    function handleClick(product: ProductItem) {
        navigate('/product/' + product.id)
    }

    useEffect(() => {
        let items;
        if (subcategoryId > 0) {
            setSubcategoryTitle(subCategoryStore.getSubcategory(subcategoryId).name);
            console.log("fetching", subcategoryId);
            items = productStore.getProductItemsFilterBySubcategory(subcategoryId);
        } else {
            items = productStore.ProductItems;
        }
        console.log("setting items", items);
        setItems(items);
    }, [productStore])


    if (items && items.length > 0) {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <h1>{subcategoryTitle}</h1>
                {items.map(pItem => {
                    return (
                        <div key={"pItem" + pItem.id} onClick={() => handleClick(pItem)}>
                            <MyCard data={pItem} />
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div >
                <span>
                    <h1>{subcategoryTitle}</h1>
                </span>
                <span>
                    Der er desværre ingen produkter i denne underkategori
                </span>

            </div>
        )
    }
});

export default ProductListPage;
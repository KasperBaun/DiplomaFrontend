import { observer } from "mobx-react-lite"
import MobXContext from "@stores/MobXContext";
import { useContext, useEffect, useState } from "react";
import MyCard from "./ProductCard";
import { useNavigate, useParams } from "react-router-dom"
import { Translater } from "@utils/Translater";
import ProductItemWeb from "@models/ProductItemWeb";
import Loading from "@components/loading/Loading";


const ProductListPage: React.FC = observer(function ProductListPage() {
    let { id } = useParams();
    const translater = new Translater(); 
    const subcategoryId = Number.parseInt(id);
    const {languageStore, productStore, subCategoryStore } = useContext(MobXContext);
    const navigate = useNavigate();
    const [items, setItems] = useState<ProductItemWeb[]>(null);
    const [subcategoryTitle, setSubcategoryTitle] = useState<string>("");

    function handleClick(product: ProductItemWeb) {
        navigate('/product/' + product.id)
    }
    
    useEffect(() => {
        let items;
        if (subcategoryId > 0) {
            setSubcategoryTitle(subCategoryStore.getSubcategory(subcategoryId).name);
            //console.log("fetching", subcategoryId);
            items = productStore.getProductItemsFilterBySubcategory(subcategoryId);
        } else {
            items = productStore.ProductItems;
        }
        console.log("setting items", items);
        setItems(items);
    }, [productStore])


        if (items && items.length > 0) {
            return (
                <div>
                    <h1>{translater.getCategoryBasedOnLanguage(languageStore,subcategoryTitle)}</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {items.map(pItem => {
                        return (
                            <div key={"pItem" + pItem.id} onClick={() => handleClick(pItem)}>
                                <MyCard data={pItem} />
                            </div>
                        )
                    })}
                </div>
                </div>
            )
        }
        else {
            return (
                <div >
                    {languageStore.currentLanguage.noProductsAvailable}
                </div>
            )
        }
});

export default ProductListPage;
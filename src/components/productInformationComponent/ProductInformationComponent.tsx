import Product from "@models/Product";
import MobXContext, { IMobXContext } from "@stores/MobXContext";
import { observer } from "mobx-react-lite";
import { useContext } from "react";

export interface IProductInfoProps {
    product: Product;
}

const defaultProps = {
    id: 0,
    name: 'N/A',
    modelNumber: 0,
    material: 'N/A',
    design: 'N/A',
    condition: 'N/A',
    quality: 'N/A',
    dimension: 'N/A',
    customText: 'N/A',
};

const ProductInformationComponent: React.FC<IProductInfoProps> = observer(function ProductInformationComponent(props: IProductInfoProps) {

    const { languageStore } = useContext<IMobXContext>(MobXContext);

    return (
        <div>
            {/* <div>
                <label>Id:</label>
                <input type="text" value={props.product.id} disabled />
            </div> */}
            <div>
                <label>{languageStore.currentLanguage.productPage_productName}</label>
                <input type="text" value={props.product.name || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productModelNumber}</label>
                <input type="text" value={props.product.modelNumber || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productMaterial}</label>
                <input type="text" value={props.product.material || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productDesign}</label>
                <input type="text" value={props.product.design || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productCondition}</label>
                <input type="text" value={props.product.condition || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productQuality}</label>
                <input type="text" value={props.product.quality || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productDimension}</label>
                <input type="text" value={props.product.dimension || 'N/A'} disabled />
            </div>
            <div>
                <label>{languageStore.currentLanguage.productPage_productCustomText}</label>
                <input type="text" value={props.product.customText || 'N/A'} disabled />
            </div>

        </div>
    )
});
export default ProductInformationComponent;
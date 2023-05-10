import { useContext } from "react";
import Button from '@mui/material/Button';
import MobXContext from "@stores/MobXContext"; import { observer } from "mobx-react-lite";
import "./ProductPage.scss";
import { ProductItemWeb } from "@models/ProductItemWeb";


type ProductDescriptionProps = {
    product: ProductItemWeb;
    source: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = observer(function ProductDescription(props: ProductDescriptionProps) {

    const { languageStore, basketStore } = useContext(MobXContext);

    function handleClick() { basketStore.addToBasket(props.product); }
    function getWeight() {
        if (props.product.weight !== 0) {
            return (
                <div className="P_Text">{languageStore.currentLanguage.productPage_weight} : {props.product.weight}</div>
            );
        }
    }

    function getHeight() {
        if (props.product.product.dimension) {
            return (
                <div className="P_Text">{languageStore.currentLanguage.productPage_productDimension} :  {props.product.product.dimension}</div>
            );
        }
    }

    function getMaterial() {
        if (props.product.product.material) {
            return (
                <div className="P_Text">{languageStore.currentLanguage.productPage_productMaterial} : {languageStore.currentLanguage.getMaterialType(props.product.product.material)} </div>
            );
        }
    }

    function getDesigner() {
        if (props.product.product.design) {
            return (
                <div className="P_Text">{languageStore.currentLanguage.productPage_productDesign} : {props.product.product.design} </div>
            );
        }
    }


    return (
        <div className="ProductDescription">
            <div className="ProductDe_header">
                <h3>{props.product.product.name}</h3>
                <div className="productDe_modelNumber">{languageStore.currentLanguage.productPage_productModelNumber} : {props.product.product.modelNumber}</div>

                <div className="productDe_price">Kr {props.product.currentPrice} DKK</div>
            </div>

            <div className="ProductDe_extraInfo">
                <div className="P_Text">{languageStore.currentLanguage.getCondition(props.product.condition)} </div>
                <div className="P_Text">{languageStore.currentLanguage.getQuality(props.product.quality)} </div>
                <div className="P_Text">{props.product.customText} </div>
            </div>

            <div className="ProductDe_specifics">
                <div style={{ fontWeight: 600 }}>{languageStore.currentLanguage.productPage_modelSpecifications}:</div>
                {getDesigner()}
                {getMaterial()}
                {getHeight()}
                {getWeight()}
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '3rem' }}>
                {props.source === "web" ? (<Button className="cartButton" variant="outlined" onClick={() => handleClick()} style={{ width: '12rem', minHeight: '3rem', justifyContent: 'center' }}>{languageStore.currentLanguage.addToBasket}</Button>) : (<></>)}
            </div>
        </div>
    );
});
export default ProductDescription;
import ProductItem from "@models/ProductItem";
import { useContext, useState} from "react";
import Button from '@mui/material/Button';
import MobXContext from "@stores/MobXContext";import { observer } from "mobx-react-lite";
import "./ProductPage.scss";
import { useNavigate } from "react-router-dom"


interface IProductDescription{
    Iproduct: ProductItem

}

const ProductDescription: React.FC<IProductDescription> = observer(function ProductDescription(props: IProductDescription){

const { languageStore, basketStore } = useContext(MobXContext);  
const navigate = useNavigate();

    function handleClick() {
        basketStore.setBasket(props.Iproduct);
        navigate('/basket' , { state: { } })
  }


function getWeight(){
    if (props.Iproduct.weight !== 0){
        return(
            <div className="P_Text">{languageStore.currentLanguage.productPage_weight} : {props.Iproduct.weight}</div>
        ); 
    }    
}

function getHeight(){
    if (props.Iproduct.product.dimension){
        return(
            <div className="P_Text">{languageStore.currentLanguage.productPage_productDimension} :  {props.Iproduct.product.dimension}</div>
        ); 
    }    
}

function getMaterial(){
    if (props.Iproduct.product.material){
        return(
            <div className="P_Text">{languageStore.currentLanguage.productPage_productMaterial} : {languageStore.currentLanguage.getMaterialType(props.Iproduct.product.material)} </div>
        ); 
    }    
}

function getDesigner(){
    if (props.Iproduct.product.design){
        return(
            <div className="P_Text">{languageStore.currentLanguage.productPage_productDesign} : {props.Iproduct.product.design} </div>
        ); 
    }    
}


 return(
    <div className="ProductDescription">
        <div className="ProductDe_header">
            <h3>{props.Iproduct.product.name}</h3>
            <div className="productDe_modelNumber">{languageStore.currentLanguage.productPage_productModelNumber} : {props.Iproduct.product.modelNumber}</div>
            
            <div className="productDe_price">Kr {props.Iproduct.currentPrice} DKK</div>
        </div>

        <div className="ProductDe_extraInfo">
            <div className="P_Text">{languageStore.currentLanguage.getCondition(props.Iproduct.condition)} </div>
            <div className="P_Text">{languageStore.currentLanguage.getQuality(props.Iproduct.quality)} </div>
            <div className="P_Text">{props.Iproduct.customText} </div>  
        </div>  

        <div className="ProductDe_specifics"> 
            <div style={{fontWeight:600}}>{languageStore.currentLanguage.productPage_modelSpecifications}:</div>
            {getDesigner()}
            {getMaterial()}
            {getHeight()}
            {getWeight()}
        </div> 

        <div style={{width:'100%', display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '3rem'}}>
            <Button className="cartButton" variant="outlined" onClick={() => handleClick()} style={{width: '12rem', minHeight: '3rem',justifyContent: 'center' }}>Tilføj til kurv</Button>
        </div>
    </div> 
);
});
export default ProductDescription;
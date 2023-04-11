import ProductDTO from "@models/DTO/ProductDTO";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";
import { observer } from "mobx-react-lite";
import "./ProductPage.scss";

interface IProductDescription{
    Iproduct: ProductItem

}

const ProductDescription: React.FC<IProductDescription> = observer(function ProductDescription(props: IProductDescription){

 return(
    <div className="ProductDescription">
        <div className="ProductDe_header">
            <h3>{props.Iproduct.product.name}</h3>
            <div className="productDe_price">Price: {props.Iproduct.currentPrice} DKK</div>
        </div>

        <div className="ProductDe_extraInfo"> 
       
    
            <p>Condition: {props.Iproduct.condition}</p>
            <p>Quality: {props.Iproduct.quality}</p>
            <p>Weight: {props.Iproduct.weight}</p>
            <p>{props.Iproduct.customText}</p>
        </div>  
    </div> 
);
});
export default ProductDescription;
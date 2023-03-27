import { conditionType, qualityType } from "./Enums";
import PriceHistory from "./PriceHistory"
import Product from "./Product";

export default class ProductItem {
    id: number;
    productId: number; 
    condition: conditionType;
    quality: qualityType;
    sold: boolean; 
    weight : number; 
    customText: string;
    images: string[];
    purchasePrice: number;
    currentPrice: number; 
    createdDate: Date;
    soldDate?: Date;
    priceHistory?: PriceHistory[];
    product: Product;  
}


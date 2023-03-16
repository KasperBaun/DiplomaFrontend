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
    imageUrls: string[];
    purchasePrice: number;
    currentPrice: number; 
    createdDate: Date;
    soldDate?: Date;
    priceHistory?: PriceHistory[];
    product: Product;  
}

export enum conditionType {
    "No shards" = 1,
    "Few shards" = 2,
    "Many shards" = 3
}
export enum qualityType { 
    "1. Quality" = 1,
    "2. Quality" = 2,
    "3. Quality" = 3
}
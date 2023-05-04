import { conditionType, qualityType } from "./Enums";
import Image from "./Image";
import PriceHistory from "./PriceHistory"
import Product from "./Product";

export default class ProductItem {
    id: number;
    productId: number;
    product: Product;
    condition: conditionType;
    quality: qualityType;
    sold: boolean;
    weight: number;
    customText: string;
    purchasePrice: number;
    currentPrice: number;
    createdDate: Date;
    soldDate?: Date;
    images: Image[];
    priceHistories?: PriceHistory[];
}


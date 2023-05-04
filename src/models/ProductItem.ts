import { conditionType, qualityType } from "./Enums";
import Image from "./Image";
import PriceHistory from "./PriceHistory"
import {Product} from "./Product";
import { ProductItemWeb } from "./ProductItemWeb";

export class ProductItem implements ProductItemWeb {
    id: number;
    currentPrice: number;
    createdDate: Date;
    condition: conditionType;
    quality: qualityType;
    weight?: number;
    customText: string;
    productId: number;
    product: Product;
    images: Image[];
    sold: boolean;
    purchasePrice: number;
    soldDate?: Date;
    priceHistories?: PriceHistory[];
}



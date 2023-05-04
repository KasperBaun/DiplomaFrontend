import { conditionType, qualityType } from "./Enums";
import Image from "./Image";
import {Product} from "./Product";

export abstract class ProductItemWeb {
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
}


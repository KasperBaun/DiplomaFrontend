import { conditionType, qualityType } from "./Enums";
import Product from "./Product";

export default class ProductItemWeb {
    id: number;
    price: number;
    createdDate: Date;
    condition: conditionType;
    quality: qualityType;
    weight?: number;
    customText: string;
    productId: number;
    product: Product;
    images: string[];
}


import { conditionType, qualityType } from "../Enums";

export default class ProductItemDTO {
    id: number;
    price: number;
    createdDate: Date;
    condition: conditionType;
    quality: qualityType;
    weight?: number;
    customText: string;
    productId: number;
    images: string[];
}


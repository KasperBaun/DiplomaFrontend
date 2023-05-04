import { conditionType, qualityType } from "../Enums";

export default class ProductItemDTO {
    id: number;
    productId: number;
    condition: conditionType;
    quality: qualityType;
    sold: boolean;
    weight?: number;
    purchasePrice: number;
    currentPrice: number;
    createdDate: Date;
    soldDate?: Date;
    customText: string;
    imageUrls: string[];
    imageIds: number[];
    priceHistoryIds: number[];
}


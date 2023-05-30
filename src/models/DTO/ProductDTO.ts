import { materialType } from "@models/Enums";

export class ProductDTO {
    id: number;
    name: string;
    modelNumber: string;
    manufacturer: string;
    material: materialType;
    design?: string;
    dimension?: string;
    subcategoryIds: number[];
}

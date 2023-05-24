import { materialType } from "./Enums";
import { SubCategory } from "./SubCategory";

export class Product {
    id: number;
    name: string;
    modelNumber: string;
    manufacturer: string;
    material: materialType;
    design?: string;
    dimension?: string;
    subcategories: SubCategory[];
}

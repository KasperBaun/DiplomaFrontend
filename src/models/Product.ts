import SubCategory from "./SubCategory";

export default class Product {
    id: number;
    name: string;
    modelNumber: number;
    material: materialType;
    design: string;
    dimension: string;
    subcategoryId: number;
    subcategory: SubCategory;
}
export enum materialType {
    porcelain = 1,
    steel = 2,
    glass = 3,
    // etc..
}
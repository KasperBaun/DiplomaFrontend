export default class Product {
    id: number;
    name: string;
    modelNumber: number;
    material: materialType;
    design: string;
    dimension: string;
    imageUrls: string[];
    subcategoryId: number;
}
// TODO: Remove this imageUrls? (and use it only in productItem?)

export enum materialType {
    porcelain = 1,
    steel = 2,
    glass = 3,
    // etc..
}
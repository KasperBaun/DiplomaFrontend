export default class Product {
    id: number;
    name: string;
    modelNumber: number;
    material: materialType;
    design: string;
    condition: conditionType;
    quality: qualityType;
    dimension: string;
    customText: string;
    imageUrls: string[];
    subcategoryId: number;
}

// TODO: PRODUCT has been split in the backend and DATA (THIS Class need to be looked upon)

export enum materialType {
    porcelain = 1,
    steel = 2,
    glass = 3,
    // etc..

}

export enum qualityType {
    "1. Quality" = 1,
    "2. Quality" = 2,
    "3. Quality" = 3
}

export enum conditionType {
    "No shards" = 1,
    "Few shards" = 2,
    "Many shards" = 3
}
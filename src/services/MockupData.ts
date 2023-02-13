import Product, { conditionType, materialType, qualityType } from "../models/Product";

export const antiqueCategories: any[] = [

]

export const productMockupData: Product[] = [
    {
        name: "Elegant Vase",
        modelNumber: 101,
        material: materialType.porcelain,
        design: "Flower Pattern",
        condition: conditionType["No shards"],
        quality: qualityType["1. Quality"],
        dimension: "9 inches x 5 inches",
        customText: "This beautiful vase is perfect for any room in your home."
    },
    {
        name: "Delicate Teapot",
        modelNumber: 102,
        material: materialType.porcelain,
        design: "Butterfly Pattern",
        condition: conditionType["No shards"],
        quality: qualityType["2. Quality"],
        dimension: "7 inches x 4 inches",
        customText: "Enjoy a warm cup of tea with this exquisite teapot."
    },
    {
        name: "Ornate Bowl",
        modelNumber: 103,
        material: materialType.porcelain,
        design: "Fruit Pattern",
        condition: conditionType["Few shards"],
        quality: qualityType["3. Quality"],
        dimension: "10 inches x 6 inches",
        customText: "This intricately designed bowl is perfect for serving salads or fruit."
    },

    {
        name: "Fine Plate",
        modelNumber: 248,
        material: materialType.porcelain,
        design: "Leaf Pattern",
        condition: conditionType["Many shards"],
        quality: qualityType["1. Quality"],
        dimension: "8 inches x 8 inches",
        customText: "This beautiful plate is perfect for special occasions."
    },
    {
        name: "Elegant Cup",
        modelNumber: 249,
        material: materialType.porcelain,
        design: "Bird Pattern",
        condition: conditionType["No shards"],
        quality: qualityType["2. Quality"],
        dimension: "3 inches x 3 inches",
        customText: "Enjoy a warm beverage with this delicate cup."
    },
    {
        name: "Ornate Teacup",
        modelNumber: 250,
        material: materialType.porcelain,
        design: "Rose Pattern",
        condition: conditionType["Few shards"],
        quality: qualityType["3. Quality"],
        dimension: "2 inches x 2 inches",
        customText: "This intricately designed teacup is perfect for a special tea time."
    }
];

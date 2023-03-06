import Category from "./Category";

export default class SubCategory{
    id: number;
    name: string;
    order?: number;
    imageUrl?: string;
    description?: string;
    categoryId: number;
    category: Category; 
}
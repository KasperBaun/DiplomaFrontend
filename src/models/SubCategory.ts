import Category from "./Category";

export default class Subcategory{
    id: number;
    name: string;
    order?: number;
    imageUrl?: string;
    description?: string;
    category: Category; 
}
import { Category } from "./Category";

export class SubCategory {
    id: number;
    name: string;
    order?: number;
    imageUrl?: string;
    description?: string;
    categoryId: number;
    category: Category;
}
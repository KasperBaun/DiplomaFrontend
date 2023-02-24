export default class Category{
    id: number;
    name: string;
    order?: number;
    imageUrl?: string;
    description?: string;
    products?: string[];
    subCategories?: string[];
}
import Category from "@models/Category";
import { WebAPIResponse } from "./APIService";
import Subcategory from "@models/Subcategory";


interface IAPIService {
    getCategories: () => Promise<Category[]>
    createCategory(category:Category): Promise<void>;
    deleteCategory(id: number): Promise<WebAPIResponse>;

    getSubcategories(): Promise<Subcategory[]>;
    createSubcategory(subCategory:Subcategory): Promise<WebAPIResponse>;
    deleteSubcategory(id: number): Promise<WebAPIResponse>;
}

export default IAPIService;
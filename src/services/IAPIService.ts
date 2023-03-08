import Category from "@models/Category";
import { WebAPIResponse } from "./APIService";
import SubCategory from "@models/SubCategory";


interface IAPIService {
    getCategories: () => Promise<Category[]>
    createCategory(category:Category): Promise<void>;
    deleteCategory(id: number): Promise<WebAPIResponse>;

    getSubCategories(): Promise<SubCategory[]>;
    createSubCategory(subCategory:SubCategory): Promise<WebAPIResponse>;
    deleteSubCategory(id: number): Promise<WebAPIResponse>;
}

export default IAPIService;
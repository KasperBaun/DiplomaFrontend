import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import Product from "@models/Product";

export interface WebAPIResponse {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: any;
}

interface IAPIService {
    getCategories: () => Promise<Category[]>
    createCategory(category: Category): Promise<void>;
    deleteCategory(id: number): Promise<WebAPIResponse>;

    createSubCategory(subcategory: SubCategory): Promise<WebAPIResponse>;
    getSubCategories(): Promise<SubCategory[]>;
    updateSubCategory(subcategory: SubCategory): Promise<WebAPIResponse>;
    deleteSubCategory(id: number): Promise<WebAPIResponse>;

    createProduct(product: Product): Promise<WebAPIResponse>;
    getProduct(id: number): Promise<WebAPIResponse>;
    getProducts(): Promise<Product[]>;
    updateProduct(product: Product): Promise<WebAPIResponse>;
    deleteProduct(id: number): Promise<WebAPIResponse>;


}

export default IAPIService;
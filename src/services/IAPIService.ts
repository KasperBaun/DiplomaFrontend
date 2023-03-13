import Category from "@models/Category";
import { WebAPIResponse } from "./APIService";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";


interface IAPIService {
    getCategories: () => Promise<Category[]>
    createCategory(category:Category): Promise<void>;
    deleteCategory(id: number): Promise<WebAPIResponse>;

    getSubCategories(): Promise<SubCategory[]>;
    createSubCategory(subcategory:SubCategory): Promise<WebAPIResponse>;
    updateSubCategory(subcategory:SubCategory): Promise<WebAPIResponse>;
    deleteSubCategory(id: number): Promise<WebAPIResponse>;

    createPayment(payment: Payment): Promise<void>;
    getPayments(): Promise<Payment[]>;
}

export default IAPIService;
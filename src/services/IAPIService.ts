import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";
import ProductItemWEB from "@models/webShop/ProductItemWEB";

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

    createPayment(payment: Payment): Promise<void>;
    getPayments(): Promise<Payment[]>;

    createProduct(product: Product): Promise<WebAPIResponse>;
    getProduct(id: number): Promise<WebAPIResponse>;
    getProducts(): Promise<Product[]>;
    updateProduct(product: Product): Promise<WebAPIResponse>;
    deleteProduct(id: number): Promise<WebAPIResponse>;

    createProductItem(productItem: ProductItem): Promise<WebAPIResponse>;
    getProductItem(id: number): Promise<WebAPIResponse>;
    getProductItems(): Promise<ProductItem[]>;
    updateProductItem(productItem: ProductItem): Promise<WebAPIResponse>;
    deleteProductItem(id: number): Promise<WebAPIResponse>;

    getProductItemDTOs(): Promise<ProductItemWEB[]>;


}

export default IAPIService;
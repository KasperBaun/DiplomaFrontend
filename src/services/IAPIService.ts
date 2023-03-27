import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";
import ProductItemDTO from "@models/DTO/ProductItemDTO";
import ProductDTO from "@models/DTO/ProductDTO";

export interface WebAPIResponse {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: any | any[];
}

interface IAPIService {

    getCategories: () => Promise<Category[]>
    createCategory(category: Category): Promise<void>;
    deleteCategory(id: number): Promise<void>;

    createSubCategory(subcategory: SubCategory): Promise<void>;
    getSubCategories(): Promise<SubCategory[]>;
    updateSubCategory(subcategory: SubCategory): Promise<SubCategory>;
    deleteSubCategory(id: number): Promise<void>;

    createPayment(payment: Payment): Promise<void>;
    getPayments(): Promise<Payment[]>;

    createProduct(product: Product): Promise<void>;
    getProduct(id: number): Promise<Product>;
    getProducts(): Promise<Product[]>;
    getProductDTOs(): Promise<ProductDTO[]>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: number): Promise<void>;

    createProductItem(productItem: ProductItem): Promise<void>;
    getProductItem(id: number): Promise<ProductItem>;
    getProductItems(): Promise<ProductItem[]>;
    updateProductItem(productItem: ProductItem): Promise<ProductItem>;
    deleteProductItem(id: number): Promise<void>;

    getProductItemDTOs(): Promise<ProductItemDTO[]>;


}

export default IAPIService;
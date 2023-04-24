import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";
import ProductDTO from "@models/DTO/ProductDTO";
import Image from '@models/Image';
import PriceHistory from "@models/PriceHistory";
import ProductItemDTO from "@models/DTO/ProductItemDTO";

export interface WebAPIResponse {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: any | any[];
}

interface IAPIService {

    /* Backoffice */
    createCategory(category: Category): Promise<void>;
    deleteCategory(id: number): Promise<void>;
    
    createSubCategory(subcategory: SubCategory): Promise<void>;
    updateSubCategory(subcategory: SubCategory): Promise<SubCategory>;
    deleteSubCategory(id: number): Promise<void>;

    createPayment(payment: Payment): Promise<void>;
    getPayments(): Promise<Payment[]>;

    createProduct(product: Product): Promise<void>;
    getProduct(id: number): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: number): Promise<void>;

    createProductItem(productItem: ProductItem): Promise<void>;
    getProductItem(id: number): Promise<ProductItem>;
    getProductItemDTOs(): Promise<ProductItemDTO[]>;
    updateProductItem(productItem: ProductItem): Promise<ProductItem>;
    deleteProductItem(id: number): Promise<void>;

    getImages(): Promise<Image[]>;
    getPriceHistories(): Promise<PriceHistory[]>;
    
    /* Webshop */
    getCategories: () => Promise<Category[]>
    getSubCategories(): Promise<SubCategory[]>;
    getProducts(): Promise<Product[]>;
    getProductDTOs(): Promise<ProductDTO[]>;
    getProductItemWebs(): Promise<ProductItemDTO[]>;

}

export default IAPIService;
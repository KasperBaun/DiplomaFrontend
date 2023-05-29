import { Category } from "@models/Category";
import { SubCategory } from "@models/SubCategory";
import { Payment } from "@models/Payment";
import { Product } from "@models/Product";
import { ProductItem } from "@models/ProductItem";
import { ProductDTO } from "@models/DTO/ProductDTO";
import { Image } from '@models/Image';
import { PriceHistory } from "@models/PriceHistory";
import { ProductItemDTO } from "@models/DTO/ProductItemDTO";
import { OrderDTO } from "@models/DTO/OrderDTO";
import { Order } from "@models/Order";
import { OrderElements } from "@models/OrderElements";
import { CreateOrderDTO } from "@models/DTO/CreateOrderDTO";
import { DiscountCode } from "@models/DiscountCode";

export interface IAPIService {

    /* Backoffice */
    getBestSellingProducts(amount: number): Promise<Product[]>;

    createCategory(category: Category): Promise<Category>;
    deleteCategory(id: number): Promise<void>;

    createSubCategory(subcategory: SubCategory): Promise<SubCategory>;
    updateSubCategory(subcategory: SubCategory): Promise<SubCategory>;
    deleteSubCategory(id: number): Promise<void>;

    createPayment(payment: Payment): Promise<Payment>;
    getPayments(): Promise<Payment[]>;

    createProduct(product: Product): Promise<Product>;
    getProduct(id: number): Promise<Product>;
    updateProduct(product: Product): Promise<Product>;
    deleteProduct(id: number): Promise<void>;

    createProductItem(productItem: ProductItem): Promise<ProductItem>;
    getProductItem(id: number): Promise<ProductItem>;
    getProductItemDTOs(): Promise<ProductItemDTO[]>;
    updateProductItem(productItem: ProductItem): Promise<ProductItem>;
    deleteProductItem(id: number): Promise<void>;

    getImages(): Promise<Image[]>;
    getPriceHistories(): Promise<PriceHistory[]>;

    getOrders(): Promise<OrderDTO[]>;
    getOrderElements(): Promise<OrderElements[]>;
    createOrder(order: CreateOrderDTO): Promise<Order>;
    updateOrder(order: Order): Promise<Order>;
    deleteOrder(id: number): Promise<void>;

    /* Webshop */
    getCategories: () => Promise<Category[]>
    getSubCategories(): Promise<SubCategory[]>;
    getProducts(): Promise<Product[]>;
    getProductDTOs(): Promise<ProductDTO[]>;
    getProductItemWebs(): Promise<ProductItemDTO[]>;
    getDiscountCodes(): Promise<DiscountCode[]>;

}

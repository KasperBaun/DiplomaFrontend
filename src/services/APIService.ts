
import Category from "@models/Category";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { Constants } from "@utils/Constants";
import IAPIService from "./IAPIService";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import { Product } from "@models/Product";
import { ProductItem } from "@models/ProductItem";
import CrudHelper from "./CrudHelper";
import SniperModel from "@models/SniperModel";
import ProductDTO from "@models/DTO/ProductDTO";
import CategoryProductView from "@models/CategoryProductView";
import { SalesSummary } from "@models/SalesSummary";
import Order from "@models/Order";
import OrderDetails from "@models/OrderDetails";
import ProductItemDetails from "@models/ProductItemDetails";
import Image from '@models/Image';
import PriceHistory from "@models/PriceHistory";
import ProductItemDTO from "@models/DTO/ProductItemDTO";
import OrderElements from "@models/OrderElements";
import OrderDTO from "@models/DTO/OrderDTO";
import Customer from "@models/Customer";
import CreateOrderDTO from "@models/DTO/CreateOrderDTO";
import ConfirmationModel from "@models/ConfirmationModel";

class APIService implements IAPIService {

    private prefix: string = `%c[APIService]`;
    private color: string = ComponentLoggingConfig.DarkBlue;
    private apiBaseUrl: string;
    private crudHelper: CrudHelper;

    constructor(_apiBaseUrl: string) {
        this.apiBaseUrl = _apiBaseUrl;
        this.crudHelper = new CrudHelper(Constants.loggingEnabled);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }

    /* Backoffice */
    async getBestSellingProducts(amount: number): Promise<Product[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Backoffice/GetBestSellerProducts?amountOfBestSellers=${amount}`, "Products");
    }

    async getProductItemDTOs(): Promise<ProductItemDTO[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Backoffice/ProductItem`, "ProductItems");
    }
    async getImages(): Promise<Image[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Image`, "Images");
    }
    async getPriceHistories(): Promise<PriceHistory[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Backoffice/PriceHistory`, "PriceHistories");
    }
    async getOrderElements(): Promise<OrderElements[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Backoffice/OrderElements`, "OrderElements");
    }

    /* Product Items */
    createProductItem(productItem: ProductItem): Promise<ProductItem> {
        throw new Error("Method not implemented.");
    }
    getProductItem(id: number): Promise<ProductItem> {
        throw new Error("Method not implemented.");
    }
    updateProductItem(productItem: ProductItem): Promise<ProductItem> {
        throw new Error("Method not implemented.");
    }
    deleteProductItem(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getProductItemWebs(): Promise<ProductItemDTO[]> {
        return this.crudHelper.readMultiple(`${this.apiBaseUrl}/ProductItem/GetAll`, "ProductItemDTOs");
    }

    /* Products */
    async createProduct(product: Product): Promise<Product> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Product`, "Product", product);
    }
    async getProduct(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    async updateProduct(product: Product): Promise<Product> {
        return await this.crudHelper.update(`${this.apiBaseUrl}/Product/${product.id}`, "Product", product);
    }
    async deleteProduct(id: number): Promise<void> {
        return await this.crudHelper.delete(this.apiBaseUrl + "/Product/" + id, "Product");
    }
    async getProducts(): Promise<Product[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Product/GetAll`, "Products");
    }
    async getProductDTOs(): Promise<ProductDTO[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Product/GetAll`, "ProductDTOs");
    }
    async getProductItemDetails(): Promise<ProductItemDetails[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/ProductItemDetails`, "ProductItemDetails");
    }

    /* Subcategories */
    async getSubCategories(): Promise<SubCategory[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Subcategory`, "Subcategories");
    }
    async createSubCategory(subcategory: SubCategory): Promise<SubCategory> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Subcategory`, "Subcategory", subcategory);
    }
    async updateSubCategory(subcategory: SubCategory): Promise<SubCategory> {
        return await this.crudHelper.update(`${this.apiBaseUrl}/Subcategory/${subcategory.id}`, "Subcategory", subcategory);
    }
    async deleteSubCategory(id: number): Promise<void> {
        return await this.crudHelper.delete(this.apiBaseUrl + "/Subcategory/" + id, "Subcategory");
    }

    /* Categories */
    async getCategories(): Promise<Category[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Category`, "Categories");
    }
    async createCategory(category: Category): Promise<Category> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Category`, "Category", category);
    }
    async updateCategory(category: Category): Promise<Category> {
        return await this.crudHelper.update(`${this.apiBaseUrl}/Category/${category.id}`, "Category", category)
    }
    async deleteCategory(id: number): Promise<void> {
        return await this.crudHelper.delete(this.apiBaseUrl + "/Category/" + id, "Category");
    }

    /* Orders */
    async getOrders(): Promise<OrderDTO[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Order`, "Orders");
    }
    async getOrderDetails(): Promise<OrderDetails[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/OrderDetails`, "OrderDetails");
    }
    async createOrder(order: CreateOrderDTO): Promise<Order> {
        const response = await fetch(`${this.apiBaseUrl}/Order`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json',
                'access-control-allow-origin': '*'
            },
            mode: 'cors'
        });

        if(response.ok) {
            let confirmationModel : Order = await response.json();
            return confirmationModel;
        }
        else {
            return null;
        }
    }
    async updateOrder(order: Order): Promise<Order> {
        return await this.crudHelper.update(`${this.apiBaseUrl}/Order/${order.id}`, "Order", order)
    }
    async deleteOrder(id: number): Promise<void> {
        return await this.crudHelper.delete(this.apiBaseUrl + "/Order/" + id, "Order");
    }

    /* Inventory */
    async getCategoryProducts(): Promise<CategoryProductView[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Inventory`, "CategoryProductView");
    }

    /* Payment */
    async getPayments(): Promise<Payment[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Payment`, "Payment");
    }
    async createPayment(payment: Payment): Promise<Payment> {
        return await this.crudHelper.create(this.apiBaseUrl + "/Payment", "Payment", payment);
    }
    async getPaymentById(id: number): Promise<Payment> {
        return await this.crudHelper.readSingle(this.apiBaseUrl + "/Payment/" + id, "Payment");
    }

    /* Sales */
    async getSalesSummary(): Promise<SalesSummary[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/SalesSummary`, "Sales");
    }

    /* Sniper */
    async getSniping(searchValue: string): Promise<SniperModel[]> {
        return await this.crudHelper.readMultiple(this.apiBaseUrl + "/Sniper?arg=" + searchValue, "SniperModel")
    }

    /* Customers */
    async getCustomers(): Promise<Customer[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Customer`, "Customers");
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Customer`, "Customer", customer);
    }
}

export default APIService;
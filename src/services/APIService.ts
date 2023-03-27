
import Category from "@models/Category";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { Constants } from "@utils/Constants";
import IAPIService from "./IAPIService";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";
import CrudHelper from "./CrudHelper";
import SniperModel from "@models/SniperModel";
import ProductItemDTO from "@models/DTO/ProductItemDTO";
import ProductDTO from "@models/DTO/ProductDTO";

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

    /* Product Items */
    createProductItem(productItem: ProductItem): Promise<void> {
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
    async getProductItems(): Promise<ProductItem[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/ProductItem/GetAll`, "ProductItems");
    }
    async getProductItemDTOs(): Promise<ProductItemDTO[]> {
        return this.crudHelper.readMultiple(`${this.apiBaseUrl}/ProductItem/GetAll`, "ProductItemDTOs");
    }


    /* Products */
    async createProduct(product: Product): Promise<void> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Product`, "Product", product);
    }
    getProduct(id: number): Promise<Product> {
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


    /* Subcategories */
    async getSubCategories(): Promise<SubCategory[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Subcategory`, "Subcategories");
    }
    async createSubCategory(subcategory: SubCategory): Promise<void> {
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
    async createCategory(category: Category): Promise<void> {
        return await this.crudHelper.create(`${this.apiBaseUrl}/Category`, "Category", category);
    }
    async updateCategory(category: Category): Promise<Category> {
        return await this.crudHelper.update(`${this.apiBaseUrl}/Category/${category.id}`, "Category", category)
    }
    async deleteCategory(id: number): Promise<void> {
        return await this.crudHelper.delete(this.apiBaseUrl + "/Category/" + id, "Category");
    }

    /* Payment */
    async getPayments(): Promise<Payment[]> {
        return await this.crudHelper.readMultiple(`${this.apiBaseUrl}/Payment`, "Payment");
    }
    async createPayment(payment: Payment): Promise<void> {
        return await this.crudHelper.create(this.apiBaseUrl + "/Payment", "Payment", payment);
    }

    /* Sniper */
    async getSniping(searchValue : string): Promise<SniperModel[]> {
        return await this.crudHelper.readMultiple(this.apiBaseUrl + "/Sniper?arg=" + searchValue, "SniperModel")
    }
}

export default APIService;
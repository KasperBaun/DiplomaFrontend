import { makeAutoObservable, runInAction } from 'mobx';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import { Product } from '@models/Product';
import Category from '@models/Category';
import SubCategory from '@models/SubCategory';
import Image from '@models/Image';
import ProductDTO from '@models/DTO/ProductDTO';
import ProductItemDTO from '@models/DTO/ProductItemDTO';
import { ProductItemWeb } from '@models/ProductItemWeb';
import Order from '@models/Order';
import { MobilePayForm, CardInfo, CheckoutForm, PaymentForm } from "@models/Checkout";
import Customer from '@models/Customer';

export class WebshopStore {
    private static _Instance: WebshopStore;
    private rootStore: RootStore;
    private prefix: string = `%c[WebshopStore]`;
    private color: string = ComponentLoggingConfig.DarkGreen;
    private apiService: APIService;

    /* Loading states */
    private loaded: boolean = false;

    /* Data arrays */
    private _categories: Category[] = [];
    private _subcategories: SubCategory[] = [];
    private _products: Product[] = [];
    private _productItems: ProductItemWeb[] = [];
    private _images: Image[] = [];
    private _checkoutPayments : PaymentForm[] = [];
    private _customer : Customer = null;

    /* Maps for quick access */
    private _categoryMap: Map<number, Category> = new Map();
    private _checkoutPaymentMap: Map<number, PaymentForm> = new Map();
    private _subcategoryMap: Map<Number, SubCategory> = new Map();
    private _productMap: Map<number, Product> = new Map();
    private _productItemMap: Map<number, ProductItemWeb> = new Map();
    private subcategoriesInCategoryMap: Map<Number, SubCategory[]> = new Map();

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        const categories = await this.apiService.getCategories();
        const categoryMap = this.createCategoryMap(categories);
        const subcategories = await this.apiService.getSubCategories();
        this.mapCategoryToSubcategory(categories,subcategories);
        const subcategoryMap = this.createSubcategoryMap(subcategories);
        const subcategoryToCategoryMap = this.mapSubCategoriesToCategoryId(categories,subcategories);
        const images = await this.apiService.getImages();
        const products = this.generateProducts(await this.apiService.getProductDTOs())
        const productMap = this.createProductMap(products);
        const productItems = this.generateProductItems(await this.apiService.getProductItemWebs(), productMap, images);
        const productItemMap = this.createProductItemsMap(productItems);
        const checkoutPaymentMap = this.createCheckoutPaymentMap(this._checkoutPayments);
        const customers = await this.apiService.getCustomers();

        runInAction(() => {
            this._categories = categories;
            this._categoryMap = categoryMap;
            this._subcategories = subcategories;
            this._subcategoryMap = subcategoryMap;
            this.subcategoriesInCategoryMap = subcategoryToCategoryMap;
            this._images = images;
            this._products = products;
            this._productMap = productMap;
            this._productItems = productItems;
            this._productItemMap = productItemMap;
            this._checkoutPaymentMap = checkoutPaymentMap;
            this.loaded = true;
        })

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }

        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): WebshopStore {
        if (!WebshopStore._Instance) {
            WebshopStore._Instance = new WebshopStore(_rootStore, _apiService);
        }
        return WebshopStore._Instance;
    }


    /* Categories & Subcategories */
    private createCategoryMap(categories: Category[]): Map<number, Category> {
        const map = new Map<number, Category>();
        for (const category of categories) {
            map.set(category.id, category);
        }
        return map;
    }

    private createCheckoutPaymentMap(checkoutPayments: PaymentForm[]): Map<number, PaymentForm> {
        const map = new Map<number, PaymentForm>();
        for (const checkout of checkoutPayments) {
            map.set(checkout.id, checkout);
        }
        return map;
    }

    private createCustomerMap(customers: Customer[]): Map<number, Customer> {
        const map = new Map<number, Customer>();
        for (const customer of customers) {
            map.set(customer.id, customer);
        }
        return map;
    }

    private createSubcategoryMap(subCategories: SubCategory[]): Map<number, SubCategory> {
        const map = new Map<number, SubCategory>();
        for (const subcategory of subCategories) {
            map.set(subcategory.id, subcategory);
        }
        return map;
    }

    private mapSubCategoriesToCategoryId(categories: Category[], subCategories: SubCategory[]): Map<Number, SubCategory[]> {

        const subcategoryMap = new Map<Number, SubCategory[]>();

        for (const cat of categories) {
            subcategoryMap.set(cat.id, [])
        }
        for (const subCat of subCategories) {
            const subcatMap = subcategoryMap.get(subCat.categoryId);
            if (subcatMap) {
                subcatMap.push(subCat);
            } else {
                console.error("SubCategoryStore.mapSubCategoriesToId -> Error mapping subcategory to category; subcategory: " + subCat.name + "with categoryId: " + subCat.categoryId + "could not find category in map");
            }
        }
        return subcategoryMap;
    }

    private mapCategoryToSubcategory(categories: Category[],subCategories: SubCategory[]): void {

        for (let subCat of subCategories) {
            subCat.category = categories.find(cat => cat.id === subCat.categoryId);
        }
    }

    private getCategory (id: number): Category {
        return this._categoryMap.get(id);
    }

    /* Products & ProductItems */
    private generateProducts(productDTOs: ProductDTO[]): Product[] {
        const products: Product[] = [];
        for (const productDTO of productDTOs) {

            const productSubcategories: SubCategory[] = [];

            for (const subcatId of productDTO.subcategoryIds) {
                productSubcategories.push(this.getSubcategory(subcatId));
            }

            const product: Product = {
                id: productDTO.id,
                name: productDTO.name,
                modelNumber: productDTO.modelNumber,
                manufacturer: productDTO.manufacturer,
                design: productDTO.design,
                dimension: productDTO.dimension,
                material: productDTO.material,
                subcategories: productSubcategories
            }
            products.push(product);
        }

        return products;
    }

    private createProductMap(products: Product[]): Map<number, Product> {
        const prodMap: Map<number, Product> = new Map<number, Product>();
        for (const product of products) {
            const productExists = prodMap.get(product.id);
            if (!productExists) {
                prodMap.set(product.id, product);
            }
        }
        return prodMap;
    }

    private generateProductItems(productItemDTOs: ProductItemDTO[], productMap: Map<number, Product>, images: Image[]): ProductItemWeb[] {
        const productItems: ProductItemWeb[] = [];
        for (const productItemDTO of productItemDTOs) {

            const poImages: Image[] = images.filter(img => img.productItemId === productItemDTO.id);

            const productItem: ProductItemWeb = {
                id: productItemDTO.id,
                productId: productItemDTO.productId,
                condition: productItemDTO.condition,
                quality: productItemDTO.quality,
                weight: productItemDTO.weight,
                customText: productItemDTO.customText,
                product: productMap.get(productItemDTO.productId),
                currentPrice: productItemDTO.currentPrice,
                createdDate: productItemDTO.createdDate,
                images: poImages,
            };
            productItems.push(productItem);
        }

        return productItems;
    }

    private createProductItemsMap(productItems: ProductItemWeb[]): Map<number, ProductItemWeb> {
        const prodItemMap: Map<number, ProductItemWeb> = new Map<number, ProductItemWeb>();
        for (const prodItem of productItems) {
            const productItemExists = prodItemMap.get(prodItem.id);
            if (!productItemExists) {
                prodItemMap.set(prodItem.id, prodItem);
            }
        }
        return prodItemMap;
    }

    public async deleteProductItem(id: number): Promise<boolean> {
        await this.apiService.deleteProductItem(id);
        return;
    }

    public getProduct(id: number): Product {
        return this._productMap.get(id);
    }

    public getProductItem(id: number): ProductItemWeb {
        return this._productItemMap.get(id);
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get CheckoutPayments() : PaymentForm[] {
        return this._checkoutPayments;
    }

    public getCheckoutPaymentById(id: number): PaymentForm { 
        const result = this._checkoutPaymentMap.get(id);
        if(!result) {
            return null;
        } else {
            return result;
        }
    }

    public setCheckoutPayment(checkoutPayment: PaymentForm): void {
        this._checkoutPaymentMap.set(checkoutPayment.id, checkoutPayment);
    }

    public get productItems(): ProductItemWeb[] {
        return this._productItems;
    }

    public get Categories(): Category[] {
        return this._categories;
    }

    public get subCategories(): SubCategory[] {
        return this._subcategories;
    }

    public get Customer() : Customer {
        return this._customer;
    }

    public set Customer(customer: Customer) {
        this._customer = customer;
    }

    public async createCustomer(customer: Customer): Promise<Customer> {
        const createdCustomer = await this.apiService.createCustomer(customer);
        return createdCustomer;
    }

    public subCategoriesByCategoryID(categoryId: Number): SubCategory[] {
        const result = this.subcategoriesInCategoryMap.get(categoryId);
        if (!result) {
            return [];
        } else {
            return result;
        }
    }

    public getSubcategory(id: number): SubCategory {
        return this._subcategoryMap.get(id);
    }

    public async createOrder(order: Order): Promise<Order> {
        return await this.apiService.createOrder(order);
    }
}

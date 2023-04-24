import { makeAutoObservable, runInAction } from 'mobx';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import ProductItem from '@models/ProductItem';
import Product from '@models/Product';
import Category from '@models/Category';
import SubCategory from '@models/SubCategory';
import Image from '@models/Image';
import PriceHistory from '@models/PriceHistory';
import ProductDTO from '@models/DTO/ProductDTO';
import ProductItemDTO from '@models/DTO/ProductItemDTO';


export class BackofficeStore {
    private static _Instance: BackofficeStore;
    private rootStore: RootStore;
    private prefix: string = `%c[BackofficeStore]`;
    private color: string = ComponentLoggingConfig.DarkGreen;
    private apiService: APIService;

    /* Loading states */
    private loaded: boolean = false;
    private loading: boolean = false;
    private categoriesLoaded: boolean = false;
    private subcategoriesLoaded: boolean = false;
    private productsLoaded: boolean = false;
    private productItemsLoaded: boolean = false;
    private imagesLoaded: boolean = false;
    private pricehistoriesLoaded: boolean = false;

    /* Data arrays */
    private _categories: Category[] = [];
    private _subcategories: SubCategory[] = [];
    private _products: Product[] = [];
    private _productItems: ProductItem[] = [];
    private _images: Image[] = [];
    private _pricehistories: PriceHistory[] = [];

    /* Maps for quick access */
    private _categoryMap: Map<number, Category> = new Map();
    private _subcategoryMap: Map<Number, SubCategory> = new Map();
    private _productMap: Map<number, Product> = new Map();
    private _productItemMap: Map<number, ProductItem> = new Map();
    private subcategoriesInCategoryMap: Map<Number, SubCategory[]> = new Map();

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        runInAction(() => {
            this.loading = true;
        });

        // Get categories
        const categories = await this.apiService.getCategories();
        // Get subcategories
        const subcategories = await this.apiService.getSubCategories();
        // Get Images
        const images = await this.apiService.getImages();
        // Get Pricehistories
        const pricehistories = await this.apiService.getPriceHistories();

        await this.loadProducts();

        // Get Orders

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this._categories = categories;
            this._categoryMap = this.createCategoryMap(this._categories);
            this.categoriesLoaded = true;

            this._subcategories = subcategories;
            this.mapCategoryToSubcategory(this._subcategories);
            this.subcategoriesInCategoryMap = this.mapSubCategoriesToCategoryId(this._subcategories);
            this._subcategoryMap = this.createSubcategoryMap(this._subcategories);
            this.subcategoriesLoaded = true;

            this._images = images;
            this.imagesLoaded = true;

            this._pricehistories = pricehistories;
            this.pricehistoriesLoaded = true;

            this.productsLoaded = true;
            this.productItemsLoaded = true;
            this.loading = false;
            this.loaded = this.categoriesLoaded && this.subcategoriesLoaded && this.productsLoaded && this.productItemsLoaded && this.imagesLoaded && this.pricehistoriesLoaded;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): BackofficeStore {
        if (!BackofficeStore._Instance) {
            BackofficeStore._Instance = new BackofficeStore(_rootStore, _apiService);
        }
        return BackofficeStore._Instance;
    }


    /* Categories & Subcategories */
    private createCategoryMap(categories: Category[]): Map<number, Category> {
        const map = new Map<number, Category>();
        for (const category of categories) {
            map.set(category.id, category);
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

    private mapSubCategoriesToCategoryId(subCategories: SubCategory[]): Map<Number, SubCategory[]> {

        const subcategoryMap = new Map<Number, SubCategory[]>();

        for (const cat of this._categories) {
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

    private mapCategoryToSubcategory(subCategories: SubCategory[]): void {

        for (let subCat of subCategories) {
            subCat.category = this._categories.find(cat => cat.id === subCat.categoryId);
        }
    }

    public async deleteSubCategory(id: number): Promise<boolean> {
        try {
            await this.apiService.deleteSubCategory(id);
            this.refreshSubCategories();
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    public async createSubCategory(subCategory: SubCategory): Promise<void> {
        try {
            await this.apiService.createSubCategory(subCategory);
            runInAction(async () => await this.refreshSubCategories());
        }
        catch (error) {
            console.log("Failed updating subcategory: ", error);
        }
        return;
    }
    public async updateSubCategory(subCategory: SubCategory): Promise<boolean> {
        try {
            await this.apiService.updateSubCategory(subCategory);
            runInAction(async () => await this.refreshSubCategories());
        }
        catch (error) {
            console.log("Failed updating subcategory: ", error);
        }
        return;
    }

    private async refreshSubCategories(): Promise<void> {
        await runInAction(async () => {
            this._subcategories = await this.apiService.getSubCategories();
            this.mapCategoryToSubcategory(this._subcategories);
            this.mapSubCategoriesToCategoryId(this._subcategories);
        });
    }


    /* Products & ProductItems */

    public async loadProducts(): Promise<void> {
        if (!this.isLoaded) {
            const productDTOs: ProductDTO[] = await this.apiService.getProductDTOs();
            this._products = this.generateProducts(productDTOs);
            this._productMap = this.createProductMap(this._products);
            const productItemDTOs: ProductItemDTO[] = await this.apiService.getProductItemDTOs();
            this._productItems = this.generateProductItems(productItemDTOs, this._productMap);
            this._productItemMap = this.createProductItemsMap(this.productItems);

            runInAction(() => {
                this.loaded = true;
                this.loading = false;
            });
        }
    }

    private generateProducts(productDTOs: ProductDTO[]): Product[] {
        const products: Product[] = [];
        for (const productDTO of productDTOs) {

            const productSubcategories: SubCategory[] = [];

            for (const subcatId of productDTO.subcategoryIds) {
                productSubcategories.push(this.rootStore.subCategoryStore.getSubcategory(subcatId));
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

    private generateProductItems(productItemDTOs: ProductItemDTO[], productMap: Map<number, Product>): ProductItem[] {
        const productItems: ProductItem[] = [];
        for (const productItemDTO of productItemDTOs) {

            const poImages: Image[] = this._images.filter(img => img.productItemId === productItemDTO.id);
            const poPriceHistory: PriceHistory[] = this._pricehistories.filter(ph => ph.productItemId === productItemDTO.id);

            const productItem: ProductItem = {
                id: productItemDTO.id,
                productId: productItemDTO.productId,
                condition: productItemDTO.condition,
                quality: productItemDTO.quality,
                sold: false,
                weight: productItemDTO.weight,
                customText: productItemDTO.customText,
                product: productMap.get(productItemDTO.productId),
                purchasePrice: productItemDTO.purchasePrice,
                currentPrice: productItemDTO.currentPrice,
                createdDate: productItemDTO.createdDate,
                soldDate: productItemDTO.soldDate,
                images: poImages,
                priceHistory: poPriceHistory

            };
            productItems.push(productItem);
        }

        return productItems;
    }

    private createProductItemsMap(productItems: ProductItem[]): Map<number, ProductItem> {
        const prodItemMap: Map<number, ProductItem> = new Map<number, ProductItem>();
        for (const prodItem of productItems) {
            const productItemExists = prodItemMap.get(prodItem.id);
            if (!productItemExists) {
                prodItemMap.set(prodItem.id, prodItem);
            }
        }
        return prodItemMap;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get productItems(): ProductItem[] {
        return this._productItems;
    }

    /* Get Accessors */
    public get subCategories(): SubCategory[] {
        return this._subcategories;
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
}

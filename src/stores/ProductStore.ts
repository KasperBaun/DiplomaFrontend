import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import Product from '@models/Product';
import { Constants } from '@utils/Constants';
import APIService from '@services/APIService';
import ProductItem from '@models/ProductItem';
import ProductItemDTO from '@models/DTO/ProductItemDTO';
import ProductDTO from '@models/DTO/ProductDTO';
import SubCategory from '@models/SubCategory';
import ProductItemDetails from '@models/ProductItemDetails';

export class ProductStore {

    private static _Instance: ProductStore;
    private rootStore: RootStore;
    private prefix: string = `%c[ProductStore]`;
    private color: string = ComponentLoggingConfig.DarkCrimson;
    private loaded: boolean = false;
    private loading: boolean = false;
    private apiService: APIService;
    private products: Product[] = [];
    private productsLoaded: boolean = false;
    private productMap: Map<number, Product> = new Map();
    private productItems: ProductItem[] = [];
    private productItemMap: Map<number, ProductItem> = new Map();
    private productItemDetailItems : ProductItemDetails[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {

        this.loading = true;
        // Fetch products
        await this.loadProducts();
        const productItemDetailItems = await this.apiService.getProductItemDetails();

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loading = false;
            this.loaded = true;
            this.productItemDetailItems = productItemDetailItems;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): ProductStore {
        if (!ProductStore._Instance) {
            ProductStore._Instance = new ProductStore(_rootStore, _apiService);
        }
        return ProductStore._Instance;
    }

    public get isLoaded(): boolean {
        let result: boolean = !this.loading;
        result = this.loaded;
        return result;
    }

    public async loadProducts(): Promise<void> {
        if (!this.isLoaded) {
            const productDTOs: ProductDTO[] = await this.apiService.getProductDTOs();
            this.products = this.generateProducts(productDTOs);
            this.productMap = this.createProductMap(this.products);
            const productItemDTOs: ProductItemDTO[] = await this.apiService.getProductItemDTOs();
            this.productItems = this.generateProductItems(productItemDTOs, this.productMap);
            this.productItemMap = this.createProductItemsMap(this.productItems);

            runInAction(() => {
                this.loaded = true;
                this.loading = false;
            });
        }
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

    private generateProductItems(productItemDTOs: ProductItemDTO[], productMap: Map<number, Product>): ProductItem[] {
        const productItems: ProductItem[] = [];
        for (const productItemDTO of productItemDTOs) {
            const productItem: ProductItem = {
                id: productItemDTO.id,
                productId: productItemDTO.productId,
                condition: productItemDTO.condition,
                quality: productItemDTO.quality,
                sold: false,
                weight: productItemDTO.weight,
                customText: productItemDTO.customText,
                images: productItemDTO.images,
                priceHistory: [],
                product: productMap.get(productItemDTO.productId),
                purchasePrice: null,
                currentPrice: productItemDTO.price,
                createdDate: productItemDTO.createdDate,
                soldDate: null
            };
            productItems.push(productItem);
        }

        return productItems;
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

    public get Products(): Product[] {
        return this.products;
    }

    public get ProductItemDetails(): ProductItemDetails[] {
        return this.productItemDetailItems;
    }

    public get ProductItems(): ProductItem[] {
        return this.productItems;
    }

    public getProduct(id: number): Product {
        return this.productMap.get(id);
    }

    public getProductItem(id: number): ProductItem {
        return this.productItemMap.get(id);
    }

    public async deleteProduct(id: number): Promise<boolean> {
        return false;
    }

    public getProductItemsFilterBySubcategory(subcategoryId: number): ProductItem[] {
        return this.productItems.filter(p => p.product.subcategories.some(s => s.id === subcategoryId));
    }

}

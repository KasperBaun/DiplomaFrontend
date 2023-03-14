import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import Product from '@models/Product';
import { Constants } from '@utils/Constants';
import APIService from '@services/APIService';
import { productMockupData } from '@services/MockupData';

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


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        this.loading = true;
        // Fetch products
        //this.products = await this.spService.getFiles(Constants.documentLibraryListTitle);
        this.products = productMockupData;


        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loading = false;
            this.loaded = true;
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
            this.products = await this.apiService.getProducts();
            runInAction(() => {
                this.loaded = true;
                this.loading = false;
            });
        }
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public get Products(): Product[] {
        return this.products;
    }

    public async getProduct(id: number): Promise<Product> {
        return null;
    }

    public async deleteProduct(id: number): Promise<boolean> {
        return false;
    }

}

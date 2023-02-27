import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import Product from '@models/Product';
import { Constants } from '@utils/Constants';
import { MockupService } from '@services/MockupService';
import APIService from '@services/APIService';

export class ProductStore {

    private static _Instance: ProductStore;
    private rootStore: RootStore;
    private prefix: string = `%c[ProductStore]`;
    private color: string = ComponentLoggingConfig.DarkCrimson;
    private loaded: boolean = false;
    private mockupService: MockupService;
    private apiService: APIService;
    private products: Product[] = [];
    private productMap: Map<number, Product> = new Map<number, Product>();

    constructor(_rootStore: RootStore, _apiService: APIService, _mockupService: MockupService) {
        this.rootStore = _rootStore;
        this.apiService = _apiService;
        this.mockupService = _mockupService;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch products
        //this.products = await this.spService.getFiles(Constants.documentLibraryListTitle);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService, _mockupService: MockupService): ProductStore {
        if (!ProductStore._Instance) {
            ProductStore._Instance = new ProductStore(_rootStore, _apiService, _mockupService);
        }
        return ProductStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public async getProduct(id: number): Promise<Product> {
        let product = this.productMap.get(id);
        if (!product) {
            try {
                product = await this.apiService.getProduct(id);
            }
            catch (err) {
                console.error(err);
            }
        }
        return product;
    }

}

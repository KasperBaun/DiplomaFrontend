import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import Product from '@models/Product';
import { Constants } from '@utils/Constants';
import { MockupService } from '@services/MockupService';

export class ProductStore {

    private static _Instance: ProductStore;
    private rootStore: RootStore;
    private prefix: string = `%c[ProductStore]`;
    private color: string = ComponentLoggingConfig.DarkCrimson;
    private loaded: boolean = false;
    private mockupService: MockupService;
    private products: Product[] = [];

    constructor(_rootStore: RootStore, _mockupService: MockupService) {
        this.mockupService = _mockupService;
        this.rootStore = _rootStore;
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

    public static GetInstance(_rootStore: RootStore, _mockupService: MockupService): ProductStore {
        if (!ProductStore._Instance) {
            ProductStore._Instance = new ProductStore(_rootStore, _mockupService);
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
        return await this.mockupService.getProduct(id);
    }

}

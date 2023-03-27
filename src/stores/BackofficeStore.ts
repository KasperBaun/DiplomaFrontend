import { makeAutoObservable, runInAction } from 'mobx';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import ProductItem from '@models/ProductItem';


export class BackofficeStore {
    private static _Instance: BackofficeStore;
    private rootStore: RootStore;
    private prefix: string = `%c[BackofficeStore]`;
    private color: string = ComponentLoggingConfig.DarkGreen;
    private loaded: boolean = false;
    private apiService: APIService;
    private _productItems: ProductItem[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        const productItems: ProductItem[] = await this.apiService.getProductItems();

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this._productItems = productItems;
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): BackofficeStore {
        if (!BackofficeStore._Instance) {
            BackofficeStore._Instance = new BackofficeStore(_rootStore, _apiService);
        }
        return BackofficeStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get productItems(): ProductItem[] {
        return this._productItems;
    }
}

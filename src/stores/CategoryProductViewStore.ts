import { makeAutoObservable, runInAction } from 'mobx';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import CategoryProductView from '@models/CategoryProductView';


export class CategoryProductViewStore {
    private static _Instance: CategoryProductViewStore;
    private rootStore: RootStore;
    private prefix: string = `%c[CategoryProductViewStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private apiService: APIService;
    private _CPVs: CategoryProductView[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {

        const CPVs = await this.apiService.getCategoryProducts();

        runInAction(() => {
            this._CPVs = CPVs;
            this.loaded = true;
        })

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): CategoryProductViewStore {
        if (!CategoryProductViewStore._Instance) {
            CategoryProductViewStore._Instance = new CategoryProductViewStore(_rootStore, _apiService);
        }
        return CategoryProductViewStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get CategoryProducts(): CategoryProductView[] {
        return this._CPVs;
    }
}

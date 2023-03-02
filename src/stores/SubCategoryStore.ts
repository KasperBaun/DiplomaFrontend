import { makeAutoObservable, runInAction } from 'mobx';
import SubCategory from '@models/SubCategory';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';

export class SubCategoryStore{

    private static _Instance: SubCategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[SubCategoryStore]`;
    private color: string = ComponentLoggingConfig.Lightcyan;
    private loaded: boolean = false;
    private apiService: APIService;
    private subCategories: SubCategory[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch categories
        //this.subCategories = await this.mockupService.getSubCategories();

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): SubCategoryStore {
        if (!SubCategoryStore._Instance) {
            SubCategoryStore._Instance = new SubCategoryStore(_rootStore, _apiService);
        }
        return SubCategoryStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public  getSubCategories(): SubCategory[] {
        return this.subCategories;
    }

    /*public async getSubCategory(id: number): Promise<SubCategory> {
        return await this.mockupService.getSubCategory(id);
    } */

}

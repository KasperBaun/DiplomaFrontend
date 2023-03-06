import { makeAutoObservable, runInAction } from 'mobx';
import Subcategory from '@models/Subcategory';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';

export class SubCategoryStore {

    private static _Instance: SubCategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[SubCategoryStore]`;
    private color: string = ComponentLoggingConfig.Lightcyan;
    private loaded: boolean = false;
    private apiService: APIService;
    private _subCategories: SubCategory[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch categories
        //this.subCategories = await this.mockupService.getSubCategories();

        this._subCategories = await this.apiService.getSubCategories(); 

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
    public get subCategories(): Subcategory[] {
        return this._subCategories;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public  getSubCategories(): SubCategory[] {
        return this._subCategories;
    }

    public get SubCategories(): SubCategory[] {
        return this._subCategories;
    }


    /*public async getSubCategory(id: number): Promise<SubCategory> {
        return await this.mockupService.getSubCategory(id);
    } */

    public async deleteSubcategory(id: number): Promise<boolean> {
        return null;
    }

    public async createSubcategory(subCategory: Subcategory): Promise<boolean> {
        const response = await this.apiService.createSubcategory(subCategory);
        if (response.success) {
            return true;
        } else {
            return false;
        }
    }

}

import { makeAutoObservable, runInAction } from 'mobx';
import Subcategory from '@models/Subcategory';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';
import Category from '@models/Category';

export class SubCategoryStore {

    private static _Instance: SubCategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[SubCategoryStore]`;
    private color: string = ComponentLoggingConfig.Lightcyan;
    private loaded: boolean = false;
    private apiService: APIService;
    private _subCategories: Subcategory[] = [];
    private subcategoryMapping : Map<Number, Subcategory[]> = new Map(); 
    
    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch subcategories
        this._subCategories = await this.apiService.getSubcategories();
        this.mapSubCategoriesToId(this._subCategories);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public mapSubCategoriesToId(subCategories : Subcategory[]){
        const categories = this.rootStore.categoryStore.Categories

        for (const cat of categories){
            this.subcategoryMapping.set(cat.id, [])
        }
        for(let subCat of subCategories){
            this.subcategoryMapping.get(subCat.categoryId).push(subCat); 
        }
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

    public getSubcategories(): Subcategory[] {
        return this._subCategories;
    }

    public get SubCategories(): Subcategory[] {
        return this._subCategories;
    }

    public subCategoriesByCategoryID(categoryId : Number) : Subcategory[]{

        return this.subcategoryMapping.get(categoryId);
    }

    public async getSubcategory(id: number): Promise<Subcategory> {
        return null;
    }

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

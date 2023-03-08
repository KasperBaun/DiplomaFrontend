import { makeAutoObservable, runInAction } from 'mobx';
import SubCategory from '@models/SubCategory';
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
    private subcategoryMapping: Map<Number, SubCategory[]> = new Map();


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch subcategories
        this._subCategories = await this.apiService.getSubcategories();
        this.mapCategoryToSubcategory(this._subCategories);
        this.mapSubCategoriesToId(this._subCategories);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public mapSubCategoriesToId(subCategories: SubCategory[]): void {
        const categories = this.rootStore.categoryStore.Categories;
        this.subcategoryMapping = new Map<Number, SubCategory[]>();

        for (const cat of categories) {
            this.subcategoryMapping.set(cat.id, [])
        }
        for (let subCat of subCategories) {
            this.subcategoryMapping.get(subCat.categoryId).push(subCat);
        }
    }

    public mapCategoryToSubcategory(subCategories: SubCategory[]): void {

        for (let subCat of subCategories) {
            subCat.category = this.rootStore.categoryStore.Categories.find(cat => cat.id === subCat.categoryId);
        }
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): SubCategoryStore {
        if (!SubCategoryStore._Instance) {
            SubCategoryStore._Instance = new SubCategoryStore(_rootStore, _apiService);
        }
        return SubCategoryStore._Instance;
    }
    public get subCategories(): SubCategory[] {
        return this._subCategories;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public getSubCategories(): SubCategory[] {
        return this._subCategories;
    }

    public get SubCategories(): SubCategory[] {
        return this._subCategories;
    }

    public subCategoriesByCategoryID(categoryId: Number): SubCategory[] {

        return this.subcategoryMapping.get(categoryId);
    }

    public async getSubcategory(id: number): Promise<SubCategory> {
        return this._subCategories.find(subCat => subCat.id === id);
    }

    public async deleteSubcategory(id: number): Promise<boolean> {
        try {
            await this.apiService.deleteSubcategory(id);
            this.refreshSubcategories();
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    public async createSubCategory(subCategory: SubCategory): Promise<boolean> {
        const response = await this.apiService.createSubCategory(subCategory);
        if (response.success) {
            await this.refreshSubcategories();
            return true;
        } else {
            return false;
        }
    }
    public async updateSubcategory(subCategory: SubCategory): Promise<boolean> {
        const response = await this.apiService.updateSubcategory(subCategory);
        if (response.success) {
            await this.refreshSubcategories();
            return true;
        } else {
            return false;
        }
    }

    private async refreshSubcategories(): Promise<void> {
        await runInAction(async () => {
            this._subCategories = await this.apiService.getSubcategories();
            this.mapCategoryToSubcategory(this._subCategories);
            this.mapSubCategoriesToId(this._subCategories);
        });
    }

}

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
    private _subcategoryMap: Map<Number, SubCategory> = new Map();
    private subcategoriesInCategoryMap: Map<Number, SubCategory[]> = new Map();


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch subcategories
        this._subCategories = await this.apiService.getSubCategories();
        this.mapCategoryToSubcategory(this._subCategories);
        this.subcategoriesInCategoryMap = this.mapSubCategoriesToCategoryId(this._subCategories);
        this._subcategoryMap = this.createSubcategoryMap(this._subCategories);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    private createSubcategoryMap(subCategories: SubCategory[]): Map<number, SubCategory> {
        const map = new Map<number, SubCategory>();
        for (const subcategory of subCategories) {
            map.set(subcategory.id, subcategory);
        }
        return map;
    }

    private mapSubCategoriesToCategoryId(subCategories: SubCategory[]): Map<Number, SubCategory[]> {
        const categories = this.rootStore.categoryStore.Categories;
        const subcategoryMap = new Map<Number, SubCategory[]>();

        for (const cat of categories) {
            subcategoryMap.set(cat.id, [])
        }
        for (const subCat of subCategories) {
            const subcatMap = subcategoryMap.get(subCat.categoryId);
            if (subcatMap) {
                subcatMap.push(subCat);
            } else {
                console.error("SubCategoryStore.mapSubCategoriesToId -> Error mapping subcategory to category; subcategory: " + subCat.name + "with categoryId: " + subCat.categoryId + "could not find category in map");
            }
        }
        return subcategoryMap;
    }

    private mapCategoryToSubcategory(subCategories: SubCategory[]): void {

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
        return this.subcategoriesInCategoryMap.get(categoryId);
    }

    public getSubcategory(id: number): SubCategory {
        return this._subcategoryMap.get(id);
    }

    public async deleteSubCategory(id: number): Promise<boolean> {
        try {
            await this.apiService.deleteSubCategory(id);
            this.refreshSubCategories();
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    public async createSubCategory(subCategory: SubCategory): Promise<void> {
        await this.apiService.createSubCategory(subCategory);
        await this.refreshSubCategories();
        return;
    }
    public async updateSubCategory(subCategory: SubCategory): Promise<boolean> {
        await this.apiService.updateSubCategory(subCategory);
        await this.refreshSubCategories();
        return;
    }

    private async refreshSubCategories(): Promise<void> {
        await runInAction(async () => {
            this._subCategories = await this.apiService.getSubCategories();
            this.mapCategoryToSubcategory(this._subCategories);
            this.mapSubCategoriesToCategoryId(this._subCategories);
        });
    }

}

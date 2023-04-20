import { makeAutoObservable, runInAction } from 'mobx';
import Category from '@models/Category';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';


export class CategoryStore {
    private static _Instance: CategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[CategoryStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private apiService: APIService;
    private _categories: Category[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {

        const categories = await this.apiService.getCategories();

        runInAction(() => {
            this._categories = categories;
            this.loaded = true;
        })

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): CategoryStore {
        if (!CategoryStore._Instance) {
            CategoryStore._Instance = new CategoryStore(_rootStore, _apiService);
        }
        return CategoryStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get Categories(): Category[] {
        return this._categories;
    }

    public getCategory(id: number): Category {
        return this._categories.find(c => c.id === id);
    }

    public async createCategory(category: Category): Promise<void> {
        try {
            await this.apiService.createCategory(category).then(() => {
                runInAction(() => {
                    this._categories.push(category);
                }
                )
            });
            return;
        } catch (err) {
            console.log("Failed creating new category. Error: ", err);
        }
    }

    public async deleteCategory(id: number): Promise<void> {
        await this.apiService.deleteCategory(id);
        runInAction(() => {
            this._categories = this._categories.filter(c => c.id !== id);
        })
        return;
    }

    public async updateCategory(category: Category): Promise<void> {
        try {
            await this.apiService.updateCategory(category)
                .then(async () => await this.refreshCategories());
            return;
        } catch (err) {
            console.log("Failed creating new category. Error: ", err);
        }
        return;
    }

    private async refreshCategories(): Promise<void> {
        await runInAction(async () => {
            this._categories = await this.apiService.getCategories();
        });
    }
}

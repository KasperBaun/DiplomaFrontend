import { makeAutoObservable, runInAction } from 'mobx';
import Category from '@models/Category';
import APIService from '@services/APIService';
import { MockupService } from '@services/MockupService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';


export class CategoryStore {
    private static _Instance: CategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[CategoryStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private mockupService: MockupService;
    private apiService: APIService;
    private _categories: Category[] = [];

    constructor(_rootStore: RootStore, _mockupService: MockupService, _apiService: APIService) {
        this.apiService = _apiService;
        this.mockupService = _mockupService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch categories
        this._categories = await this.apiService.getCategories()

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _mockupService: MockupService, _apiService: APIService): CategoryStore {
        if (!CategoryStore._Instance) {
            CategoryStore._Instance = new CategoryStore(_rootStore, _mockupService, _apiService);
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
        return await this.apiService.createCategory(category);
    }

    public async deleteCategory(id: number): Promise<boolean> {
        const deleteResult = await this.apiService.deleteCategory(id);
        if (deleteResult.success) {
            runInAction(() => {
                this._categories = this._categories.filter(c => c.id !== id);
            })
            return true;
        }
        if (!deleteResult.success) {
            return false;
        }
    }
}

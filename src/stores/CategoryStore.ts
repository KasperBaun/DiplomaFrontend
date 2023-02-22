import { makeAutoObservable, runInAction } from 'mobx';
import Category from '../models/Category';
import APIService from '../services/APIService';
import { MockupService } from '../services/MockupService';
import { ComponentLoggingConfig } from '../utils/ComponentLoggingConfig';
import { Constants } from '../utils/Constants';

import { RootStore } from './RootStore';


export class CategoryStore{
    private static _Instance: CategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[CategoryStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private mockupService: MockupService;
    private apiService: APIService;
    private categories: Category[] = [];

    constructor(_rootStore: RootStore, _mockupService: MockupService, _apiService: APIService) {
        this.apiService = _apiService;
        this.mockupService = _mockupService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch categories
        this.categories = await this.mockupService.getCategories();

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

    public  getCategories(): Category[] {
        return this.categories;
    }

    public async getCategory(id: number): Promise<Category> {
        return await this.mockupService.getCategory(id);
    }

    public async createCategory(category: Category): Promise<void>{
        return await this.apiService.createCategory(category);
    }
}

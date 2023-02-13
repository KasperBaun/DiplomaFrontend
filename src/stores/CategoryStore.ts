import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '../utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import Category from '../models/Category';
import { Constants } from '../utils/Constants';
import { MockupService } from '../services/MockupService'; 

export class CategoryStore{
    private static _Instance: CategoryStore;
    private rootStore: RootStore;
    private prefix: string = `%c[CategoryStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private mockupService: MockupService;
    private categories: Category[] = [];

    constructor(_rootStore: RootStore, _mockupService: MockupService) {
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

    public static GetInstance(_rootStore: RootStore, _mockupService: MockupService): CategoryStore {
        if (!CategoryStore._Instance) {
            CategoryStore._Instance = new CategoryStore(_rootStore, _mockupService);
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
}

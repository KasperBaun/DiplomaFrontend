import { makeAutoObservable, runInAction } from "mobx";
import { ProductStore } from "./ProductStore";
import { CategoryStore } from "./CategoryStore";
import { IMobXContext } from "./MobXContext";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import APIService from "@services/APIService";
import { Constants } from "@utils/Constants";
import { LanguageStore } from "./LanguageStore";
import { SubCategoryStore } from "./SubCategoryStore";


export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;
    private apiService: APIService;
    productStore: ProductStore;
    categoryStore: CategoryStore;
    subCategoryStore: SubCategoryStore;
    languageStore: LanguageStore;
    rootStore: RootStore = this;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // Create API with baseUrl from constants
        this.apiService = new APIService(Constants.apiBaseUrl);
        // Instantiate stores here
        this.productStore = ProductStore.GetInstance(this, this.apiService);
        this.categoryStore = CategoryStore.GetInstance(this, this.apiService);
        this.languageStore = LanguageStore.GetInstance(this);
        this.subCategoryStore = SubCategoryStore.GetInstance(this, this.apiService);
        makeAutoObservable(this);
        void this.init();
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        // Init stores here
        const prodLoaded = await this.productStore.init();
        const catLoaded = await this.categoryStore.init();
        const langLoaded = await this.languageStore.init();
        const subcatLoaded = await this.subCategoryStore.init();

        runInAction(() => {
            this.loaded = prodLoaded && catLoaded && langLoaded && subcatLoaded;
        })
        if (Constants.loggingEnabled) {
            const t2 = performance.now();
            ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} finished constructing stores`, t1, t2, this.color);
        }
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }
}
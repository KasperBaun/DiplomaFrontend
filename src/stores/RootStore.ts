import { makeAutoObservable, runInAction } from "mobx";
import { ProductStore } from "./ProductStore";
import { CategoryStore } from "./CategoryStore";
import { IMobXContext } from "./MobXContext";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import APIService from "@services/APIService";
import { Constants } from "@utils/Constants";
import { LanguageStore } from "./LanguageStore";
import { SubCategoryStore } from "./SubCategoryStore";
import { PaymentStore } from "./PaymentStore";
import { BackofficeStore } from "./BackofficeStore";
import { SniperStore } from "./SniperStore";
import { AuthStore } from "./AuthStore";
import { AuthService } from "@services/AuthService";


export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;
    private apiService: APIService;
    private authService: AuthService;
    productStore: ProductStore;
    categoryStore: CategoryStore;
    subCategoryStore: SubCategoryStore;
    paymentStore: PaymentStore;
    languageStore: LanguageStore;
    backofficeStore: BackofficeStore;
    sniperStore: SniperStore;
    authStore: AuthStore;
    rootStore: RootStore = this;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // Create API with baseUrl from constants
        this.apiService = new APIService(Constants.localApiUrl);
        this.authService = new AuthService(Constants.localApiUrl);

        // Instantiate stores here
        this.productStore = ProductStore.GetInstance(this, this.apiService);
        this.categoryStore = CategoryStore.GetInstance(this, this.apiService);
        this.languageStore = LanguageStore.GetInstance(this);
        this.paymentStore = PaymentStore.GetInstance(this, this.apiService);
        this.subCategoryStore = SubCategoryStore.GetInstance(this, this.apiService);
        this.backofficeStore = BackofficeStore.GetInstance(this, this.apiService);
        this.sniperStore = SniperStore.GetInstance(this, this.apiService);
        this.authStore = AuthStore.GetInstance(this, this.authService);

        makeAutoObservable(this);
        void this.init();
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        // Init stores here
        const catLoaded = await this.categoryStore.init();
        const subcatLoaded = await this.subCategoryStore.init();
        const prodLoaded = await this.productStore.init();
        const langLoaded = await this.languageStore.init();
        const authLoaded = await this.authStore.init();

        runInAction(() => {
            // this.loaded = userResult && documentResult;
            this.loaded = prodLoaded && catLoaded && langLoaded && subcatLoaded && authLoaded;
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
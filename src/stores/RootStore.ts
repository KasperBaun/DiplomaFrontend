import { makeAutoObservable, runInAction } from "mobx";
import { IMobXContext } from "./MobXContext";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import APIService from "@services/APIService";
import { Constants } from "@utils/Constants";
import { LanguageStore } from "./LanguageStore";
import { BackofficeStore } from "./BackofficeStore";
import { SniperStore } from "./SniperStore";
import { AuthStore } from "./AuthStore";
import { AuthService } from "@services/AuthService";
import { BasketStore } from "./BasketStore";
import { WebshopStore } from "./WebshopStore";


export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;
    private apiService: APIService;
    private authService: AuthService;
    rootStore: RootStore = this;

    /* Stores for webshop */
    languageStore: LanguageStore;
    webshopStore: WebshopStore;
    basketStore: BasketStore;
    
    /* Stores for backoffice */
    authStore: AuthStore;
    backofficeStore: BackofficeStore;
    sniperStore: SniperStore;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // Create API with baseUrl from constants
        this.apiService = new APIService(Constants.apiBaseUrl);
        this.authService = new AuthService(Constants.apiBaseUrl);

        // Instantiate stores here
        this.languageStore = LanguageStore.GetInstance(this);
        this.webshopStore = WebshopStore.GetInstance(this, this.apiService);
        this.basketStore = BasketStore.GetInstance(this);
        this.authStore = AuthStore.GetInstance(this, this.authService);

        this.backofficeStore = BackofficeStore.GetInstance(this, this.apiService);
        this.sniperStore = SniperStore.GetInstance(this, this.apiService);

        makeAutoObservable(this);
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        const langStoreLoaded = await this.languageStore.init();
        const webshopStoreLoaded = await this.webshopStore.init();
        const basketStoreLoaded = await this.basketStore.init();

        runInAction(async () => {
            this.loaded =  langStoreLoaded && webshopStoreLoaded && basketStoreLoaded;
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
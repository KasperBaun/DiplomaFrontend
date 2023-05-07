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
    private apiService: APIService;
    private authService: AuthService;
    rootStore: RootStore = this;

    /* Loading states */
    private webshopLoaded: boolean = false;
    private webshopLoading: boolean = false;
    private backofficeLoaded: boolean = false;
    private backofficeLoading: boolean = false;
    private languageStoreLoaded: boolean = false;
    private languageStoreLoading: boolean = false;

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
        this.loadLanguageStore();
        makeAutoObservable(this);
    }

    private loadLanguageStore(): Promise<boolean> {
        runInAction(() => {this.languageStoreLoading = true;});
        return new Promise((resolve) => {
            this.languageStore.init().then((loaded) => {
                runInAction(() => {
                    this.languageStoreLoaded = loaded;
                    this.languageStoreLoading = false;
                    resolve(loaded);
                })
            })
        })
    }

    public get isBackofficeLoaded(): boolean {
        return this.backofficeLoaded;
    }
    public get isBackofficeLoading(): boolean {
        return this.backofficeLoading;
    }

    public async loadBackoffice(): Promise<void> {
        const t1 = performance.now();
        runInAction(() => {this.backofficeLoading = true;});
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} loading backoffice`, this.color)
        }
        
        const backofficeStoreLoaded = await this.backofficeStore.init();
        const sniperStoreLoaded = await this.sniperStore.init();

        runInAction(async () => {
            this.backofficeLoading = false;
            this.backofficeLoaded =  backofficeStoreLoaded && sniperStoreLoaded;
        })
        if (Constants.loggingEnabled) {
            const t2 = performance.now();
            ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} finished loading backoffice`, t1, t2, this.color);
        }
    }

    public get isWebshopLoaded(): boolean {
        return this.webshopLoaded;
    }
    public get isWebshopLoading(): boolean {
        return this.webshopLoading;
    }

    public async loadWebShop(): Promise<void> {
        const t1 = performance.now();
        runInAction(() => {this.webshopLoading = true;});
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} loading webshop`, this.color)
        }
   
        const webshopStoreLoaded = await this.webshopStore.init();
        const basketStoreLoaded = await this.basketStore.init();

        runInAction(async () => {
            this.webshopLoading = false;
            this.webshopLoaded =  webshopStoreLoaded && basketStoreLoaded;
        })
        if (Constants.loggingEnabled) {
            const t2 = performance.now();
            ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} finished loading webshop`, t1, t2, this.color);
        }
    }

   

}
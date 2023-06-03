import { makeAutoObservable, runInAction } from 'mobx';
import { APIService } from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import { SniperModel } from '@models/SniperModel';
import { Product } from '@models/Product';
import { SniperResult } from '@models/types/SniperResult';
import { Notification } from '@models/types/Notification';


export class SniperStore {
    private static _Instance: SniperStore;
    private rootStore: RootStore;
    private prefix: string = `%c[SniperStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private apiService: APIService;
    private _sniperData: SniperModel[] = [];

    /* Sniperresults */
    private _sniperResults: SniperResult[] = [];

    /* State */
    private _isSniping: boolean = false;


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): SniperStore {
        if (!SniperStore._Instance) {
            SniperStore._Instance = new SniperStore(_rootStore, _apiService);
        }
        return SniperStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public async GetSniping(searchValue: string): Promise<SniperModel[]> {
        this._sniperData = await this.apiService.getSniping(searchValue);
        return this._sniperData;
    }

    public async SnipeMultiple(products: Product[]): Promise<void> {
        for (let i = 0; i < products.length; i++) {
            let sniperResult: SniperResult = {
                product: products[i],
                sniperResult: await this.apiService.getSniping(products[i].name),
                new: true,
                open: false
            }
            this.addSniperResult(sniperResult);
        }
    }

    public get SniperResults(): SniperResult[] {
        return this._sniperResults;
    }

    public addSniperResult(sniperResult: SniperResult): void {
        runInAction(() => {
            this._sniperResults.push(sniperResult);
        });
    }

    public async startSniper(products: Product[], navigateTo: (key: number) => void): Promise<void> {
        const startNotification: Notification = {
            message: this.rootStore.languageStore.currentLanguage.sniperStarted,
            action: () => navigateTo(4),
            actionMessage: this.rootStore.languageStore.currentLanguage.show
        }
        runInAction(() => {
            this.rootStore.backofficeStore.addNotification(startNotification);
        })
        this._isSniping = true;
        await this.rootStore.sniperStore.SnipeMultiple(products);
        const notification: Notification = {
            message: this.rootStore.languageStore.currentLanguage.newSniperResults,
            action: () => navigateTo(4),
            actionMessage: this.rootStore.languageStore.currentLanguage.show
        }

        runInAction(() => {
            this.rootStore.backofficeStore.addNotification(notification);
            this._isSniping = false;
        })
    }

    public get isSniping(): boolean {
        return this._isSniping;
    }

    public set isSniping(value: boolean) {
        runInAction(() => {
            this._isSniping = value;
        });
    }

}

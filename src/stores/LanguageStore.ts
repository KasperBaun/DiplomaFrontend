import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import { Constants } from '@utils/Constants';
import { ILocale } from '@utils/ILocale';
import DKLocale from '@utils/DKLocale';
import ENLocale from '@utils/ENLocale';

export class LanguageStore {

    private static _Instance: LanguageStore;
    private rootStore: RootStore;
    private prefix: string = `%c[LanguageStore]`;
    private color: string = ComponentLoggingConfig.DarkSalmon;
    private loaded: boolean = false;
    private locales: Map<string, ILocale> = new Map<string, ILocale>();
    private _currentLanguage: string;

    constructor(_rootStore: RootStore) {
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Load available languages
        this.locales.set("da_DK", new DKLocale());
        this.locales.set("en_US", new ENLocale());

        // Create a method that reads values from localstorage to determine previously set preffered language by user ->
        // If no preffered language was set by user -> default to da-DK locale
        this.setCurrentLanguage(localStorage['locale'] ? localStorage['locale'] : 'da_DK');

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore): LanguageStore {
        if (!LanguageStore._Instance) {
            LanguageStore._Instance = new LanguageStore(_rootStore);
        }
        return LanguageStore._Instance;
    }

    private setCurrentLanguage(language: string): void {
        this._currentLanguage = language;
    }

    public changeLanguage(lang: string): void {
        if (lang !== this._currentLanguage) {
            this.setCurrentLanguage(lang);
            localStorage.setItem('locale', lang);
        }

        // if (lang === "Dansk") {
        //     this._currentLanguage = this.locales[0];
        // }
        // if (lang === "Engelsk") {
        //     this._currentLanguage = this.locales[1];
        // }
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get currentLanguage(): ILocale {
        return this.locales.get(this._currentLanguage);
    }

}

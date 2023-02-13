import { makeAutoObservable, runInAction } from "mobx";
import { ComponentLoggingConfig } from "../utils/ComponentLoggingConfig";
import { IMobXContext } from "./MobXContext";
import { Constants } from "../utils/Constants";
import { ProductStore } from "./ProductStore";
import { MockupService } from "../services/MockupService";
import { CategoryStore } from "./CategoryStore";

export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;
    private _mockupService: MockupService = new MockupService();
    productStore: ProductStore;
    categoryStore : CategoryStore;

    rootStore: RootStore = this;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // TODO : Instantiate stores here
        this.productStore = ProductStore.GetInstance(this, this._mockupService);
        this.categoryStore = CategoryStore.GetInstance(this , this._mockupService);
        makeAutoObservable(this);
        void this.init();
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        // TODO: Init stores here
        this.productStore.init();
        this.categoryStore.init();
        runInAction(() => {
            // this.loaded = userResult && documentResult;
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
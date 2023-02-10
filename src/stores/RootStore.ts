import { makeAutoObservable, runInAction } from "mobx";
import { ComponentLoggingConfig } from "../utils/ComponentLoggingConfig";
import { IMobXContext } from "./MobXContext";
import { Constants } from "../utils/Constants";

export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;

    rootStore: RootStore = this;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // TODO : Instantiate stores here
        makeAutoObservable(this);
        void this.init();
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        // TODO: Init stores here
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
import { makeAutoObservable, runInAction } from "mobx";
import { ComponentLoggingConfig } from "../utils/ComponentLoggingConfig";
import { IMobXContext } from "./MobXContext";
import { EnvironmentKeys } from "../utils/EnvironmentKeys";

export class RootStore implements IMobXContext {

    private prefix: string = `%c[RootStore]`;
    private color: string = ComponentLoggingConfig.DarkBlueviolet;
    private loaded: boolean = false;

    rootStore: RootStore = this;

    constructor() {
        if (EnvironmentKeys.loggingEnabled) {
            console.log(`${this.prefix} constructor called`, this.color)
        }
        // TODO : Instantiate stores here
        makeAutoObservable(this);
        void this.init();
    }

    public async init(): Promise<void> {
        const t1 = performance.now();
        if (EnvironmentKeys.loggingEnabled) {
            console.log(`${this.prefix} constructing stores`, this.color)
        }
        // TODO: Init stores here
        runInAction(() => {
            // this.loaded = userResult && documentResult;
        })
        if (EnvironmentKeys.loggingEnabled) {
            const t2 = performance.now();
            ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} finished constructing stores`, t1, t2, this.color);
        }
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }
}
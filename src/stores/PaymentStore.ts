import { makeAutoObservable, runInAction } from 'mobx';
import Payment from '@models/Payment';
import APIService from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';

import { RootStore } from './RootStore';


export class PaymentStore {
    private static _Instance: PaymentStore;
    private rootStore : RootStore;
    private prefix: string = `%c[PaymentStore]`;
    private color: string = ComponentLoggingConfig.DarkChocolate;
    private loaded: boolean = false;
    private apiService: APIService;
    private _payments: Payment[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        // Fetch payments
        this._payments = await this.apiService.getPayments()

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): PaymentStore {
        if (!PaymentStore._Instance) {
            PaymentStore._Instance = new PaymentStore(_rootStore, _apiService);
        }
        return PaymentStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get Payments(): Payment[] {
        return this._payments;
    }

    public getPayment(id: number): Payment {
        return this._payments.find(p => p.id === id);
    }

    public async createPayment(payment: Payment): Promise<void> {
        return await this.apiService.createPayment(payment);
    }

    private async refreshPayments(): Promise<void> {
        await runInAction(async () => {
            this._payments = await this.apiService.getPayments();
        });
    }
}

import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import { Constants } from '@utils/Constants';
import APIService from '@services/APIService';
import Order from '@models/Orders';
import OrderDetails from '@models/OrderDetails';

export class OrderStore {

    private static _Instance: OrderStore;
    private rootStore: RootStore;
    private prefix: string = `%c[OrderStore]`;
    private color: string = ComponentLoggingConfig.DarkCrimson;
    private loaded: boolean = false;
    private loading: boolean = false;
    private apiService: APIService;
    private orders: Order[] = [];
    private orderDetails: OrderDetails[] = [];


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        const orders = await this.apiService.getOrders()
        const orderDetails = await this.apiService.getOrderDetails();

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.orders = orders;
            this.orderDetails = orderDetails;
            this.loaded = true;
        })
        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): OrderStore {
        if (!OrderStore._Instance) {
            OrderStore._Instance = new OrderStore(_rootStore, _apiService);
        }
        return OrderStore._Instance;
    }

    public get isLoaded(): boolean {
        let result: boolean = !this.loading;
        result = this.loaded;
        return result;
    }

    public get Orders(): Order[] {
        return this.orders;
    }

    public get OrderDetails(): OrderDetails[] {
        return this.orderDetails;
    }

    public getOrder(id: number): Order {
        return this.orders.find(p => p.id === id);
    }

    public async createOrder(order: Order): Promise<void> {
        return await this.apiService.createOrder(order);
    }
}

import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import { Constants } from '@utils/Constants';
import APIService from '@services/APIService';
import Order from '@models/Orders';
import OrderDetails from '@models/OrderDetails';
import OrderElements from '@models/OrderElements';
import OrderDTO from '@models/DTO/OrderDTO';

export class OrderStore {

    private static _Instance: OrderStore;
    private rootStore: RootStore;
    private prefix: string = `%c[OrderStore]`;
    private color: string = ComponentLoggingConfig.DarkCrimson;
    private loaded: boolean = false;
    private loading: boolean = false;
    private apiService: APIService;
    private orders: OrderDTO[] = [];
    private orderElements: OrderElements[] =  [];
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

    public async loadOrderStore(): Promise<void>{
        if (!this.isLoaded){
            const orderDTOs: OrderDTO[] = await this.apiService.getOrders(); 
           // this.orders = this.generateOrders(orderDTOs); 
        }
    }

    private generateOrders(ordersDTO : OrderDTO): Order[] {
        return 
        
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

    public getOrderDetail(id: number): OrderDetails[] {
        let orders = this.orderDetails.filter(p => p.id === id);
        return orders;
    }

    public async createOrder(order: Order): Promise<OrderDetails[]> {
        await this.apiService.createOrder(order);
        await this.apiService.getOrderDetails();
        return this.getOrderDetail(order.id);
    }
}

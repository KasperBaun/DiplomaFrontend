import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { RootStore } from './RootStore';
import { Constants } from '@utils/Constants';
import APIService from '@services/APIService';
import Order from '@models/Order';
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
    private orders: Order[] = [];
    private orderElements: OrderElements[] = [];
    private orderDetails: OrderDetails[] = [];

    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        await this.loadOrderStore();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }

    public async loadOrderStore(): Promise<void> {
        if (!this.isLoaded) {
            const orderDTOs: OrderDTO[] = await this.apiService.getOrders();
            const orderDetails: OrderDetails[] = await this.apiService.getOrderDetails();
            const orderElements: OrderElements[] = await this.apiService.getOrderElements();

            runInAction(() => {
                this.orderElements = orderElements;
                this.orders = this.generateOrders(orderDTOs, this.orderElements);
                this.orderDetails = orderDetails;
            });
        }
    }

    private generateOrders(ordersDTO: OrderDTO[], orderElements: OrderElements[]): Order[] {
        const orders: Order[] = [];
        for (var orderDTO of ordersDTO) {
            const orderOrderElements = orderElements.filter(oe => oe.orderId === orderDTO.id);
            const order: Order = new Order();
            order.id = orderDTO.id;
            order.customerId = orderDTO.customerId;
            order.paymentId = orderDTO.paymentId;
            order.paymentStatus = orderDTO.paymentStatus;
            order.deliveryStatus = orderDTO.deliveryStatus;
            order.discountCode = orderDTO.discountCode;
            order.active = orderDTO.active;
            order.orderElements = orderOrderElements;
            orders.push(order);
        }
        return orders;
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

    public async createOrder(order: Order): Promise<Order> {
        return await this.apiService.createOrder(order);
    }
}

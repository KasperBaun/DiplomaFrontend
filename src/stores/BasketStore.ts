import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import { ProductItemWeb } from '@models/ProductItemWeb';
import { Customer } from '@models/Customer';
import { IpInfo } from '@models/types/IpInfo';
import { Order } from '@models/Order';
import { CreateOrderDTO } from '@models/DTO/CreateOrderDTO';
import { APIService } from '@services/APIService';


export class BasketStore {
    private static _Instance: BasketStore;
    private rootStore: RootStore;
    private _apiService: APIService;
    private prefix: string = `%c[BasketStore]`;
    private color: string = ComponentLoggingConfig.DarkRed;
    private loaded: boolean = false;
    private _basket: ProductItemWeb[] = [];
    private _customer: Customer = new Customer();
    private _customerInputValidated: boolean = false;
    private _ipInfo: IpInfo;
    private _order: CreateOrderDTO = new CreateOrderDTO();

    constructor(_rootStore: RootStore, apiService: APIService) {
        this.rootStore = _rootStore;
        this._apiService = apiService;
        makeAutoObservable(this);
    }
    public static GetInstance = (_rootStore: RootStore, apiService: APIService): BasketStore => {
        if (!BasketStore._Instance) {
            BasketStore._Instance = new BasketStore(_rootStore, apiService);
        }
        return BasketStore._Instance;
    }

    public async init(): Promise<boolean> {
        // Reads values from sesion storage to check for basket info: 
        //this._basket = JSON.parse(sessionStorage['basket']);
        //this.setBasket(this._basket);

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this.loaded = true;
        })
        return this.loaded;
    }


    public addToBasket(item: ProductItemWeb): void {

        if ((this._basket.indexOf(item)) === -1) {
            this._basket.push(item);
        }
        else {
            // TODO : Make a warning:
            alert('Item is already in the basket');
        }
        // Set local storage language setting
        // sessionStorage.setItem('basket', JSON.stringify(items));
    }

    public removeFromBasket = (item: ProductItemWeb): void => {
        const index = this._basket.indexOf(item);
        if (index > -1) {
            this._basket.splice(index, 1);
        }
    }



    public get isLoaded(): boolean {
        return this.loaded;
    }
    public get Basket(): ProductItemWeb[] {
        return this._basket;
    }
    public get Customer(): Customer {
        return this._customer;
    }
    public set Customer(customer: Customer) {
        this._customer = customer;
    }
    public get CustomerInputValidated(): boolean {
        return this._customerInputValidated;
    }
    public set CustomerInputValidated(value: boolean) {
        this._customerInputValidated = value;
    }
    public get Order(): CreateOrderDTO {
        return this._order;
    }
    public set Order(order: CreateOrderDTO) {
        this._order = order;
    }
    public updateOrder = (): void => {
        runInAction(() => {
            this._order.customer = this._customer;
            console.log("Order updated successfully");
        })
    }

    public customerPropertiesEmpty = (): boolean => {
        const { email, firstName, lastName, address, zipCode, city, country, phone } = this._customer;

        if (
            email === '' || email === undefined ||
            firstName === '' || firstName === undefined ||
            lastName === '' || lastName === undefined ||
            address === '' || address === undefined ||
            zipCode === '' || zipCode === undefined ||
            city === '' || city === undefined ||
            country === '' || country === undefined ||
            // countryCode === '' || countryCode === undefined ||
            phone === '' || phone === undefined
        ) {
            return true;
        }
        return false;
    }

    public async createOrder(): Promise<Order> {
        return await this._apiService.createOrder(this._order);
    }
}

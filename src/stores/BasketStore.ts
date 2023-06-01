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
import { Payment } from '@models/Payment';
import { ExtentionMethods } from '@utils/ExtentionMethods';
import { ProductItem } from '@models/ProductItem';
import { useContext } from 'react';
import MobXContext, { IMobXContext } from './MobXContext';
import { LanguageStore } from './LanguageStore';


export class BasketStore {
    private static _Instance: BasketStore;
    private rootStore: RootStore;
    private _apiService: APIService;
    private prefix: string = `%c[BasketStore]`;
    private color: string = ComponentLoggingConfig.DarkRed;

    /* Loading states */
    private loaded: boolean = false;
    private _orderCreated: boolean = false;
    private _customerInputValidated: boolean = false;

    /* Data models */
    private _basket: ProductItemWeb[] = [];
    private _customer: Customer = new Customer();
    private _payment: Payment = new Payment();
    private _ipInfo: IpInfo;
    private _orderDTO: CreateOrderDTO = new CreateOrderDTO();
    private _order: Order = new Order();


    constructor(_rootStore: RootStore, apiService: APIService) {
        this.rootStore = _rootStore;
        this._apiService = apiService;
        this._orderDTO.payment = this._payment;
        this._orderDTO.discountCode = {
            code: "None",
            discountPercentage: 13,
            id: 0
        };
        this._orderDTO.customer = this._customer;
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


    public addToBasket(item: ProductItemWeb, languageStore: LanguageStore): void {
        

        if ((this._basket.indexOf(item)) === -1) {
            this._basket.push(item);
        }
        else {
            alert(languageStore.currentLanguage.alreadyInBasket); 
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
    public get OrderCreated(): boolean {
        return this._orderCreated;
    }
    public get Order(): Order {
        return this._order;
    }
    public get OrderDTO(): CreateOrderDTO {
        return this._orderDTO;
    }
    public set OrderDTO(order: CreateOrderDTO) {
        this._orderDTO = order;
    }
    public resetBasket(): void {
        this._basket = [];
    }
    public updateOrder = (): void => {
        runInAction(() => {
            this._orderDTO.customer = this._customer;
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
            phone === 0 || phone === undefined
        ) {
            return true;
        }
        return false;
    }

    public createOrder = async (): Promise<void> => {
        if (this._basket.length === 0) {
            alert("No items in basket!");
            return;
        }
        if (!this._orderDTO.productItemIds) {
            this._orderDTO.productItemIds = [];
        }
        for (var productItem of this._basket) {
            this._orderDTO.productItemIds.push(productItem.id);
        }
        const result = await this._apiService.createOrder(this._orderDTO);
        if (result !== null || result !== undefined) {
            runInAction(() => {
                this._order = result;
                this._orderCreated = true;
            })
        } else {
            alert("Failed to create order. No money has been paid. Please try again later.");
        }
    }

    public getTotal(productItems: ProductItem[], addExtraCost?: number): string {
        const amount = productItems.reduce((acc, item) => acc + item.currentPrice, 0) + (addExtraCost ? addExtraCost : 0);
        return ExtentionMethods.formatPrice(amount, this.rootStore.languageStore.getCurrentLanguageCode(), 'DKK');
    }

    public getVAT(productItems: ProductItem[]): string {
        const vat = productItems.reduce((acc, item) => acc + item.currentPrice, 0) * 0.25;
        return ExtentionMethods.formatPrice(
            vat,
            this.rootStore.languageStore.getCurrentLanguageCode(),
            'DKK'
        );
    }

}

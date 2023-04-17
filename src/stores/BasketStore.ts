import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import ProductItem from '@models/ProductItem';


export class BasketStore {
    private static _Instance: BasketStore;
    private rootStore : RootStore;
    private prefix: string = `%c[BasketStore]`;
    private color: string = ComponentLoggingConfig.DarkRed;
    private loaded: boolean = false;
    private _basket: ProductItem[] = [];

    constructor(_rootStore: RootStore) {
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        this._basket = new Array<ProductItem>();
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


    public addToBasket(item: ProductItem): void {

        if ((this._basket.indexOf(item)) === -1){
            this._basket.push(item);
        }
        else {
            // TODO : Make a warning:
            console.log('Item is already in the basket');
        }   
        // Set local storage language setting
       // sessionStorage.setItem('basket', JSON.stringify(items));
    }

    public removeFromBasket(item: ProductItem): void {
        
        const newBasketArray = this._basket;
        const index = newBasketArray.indexOf(item);
        newBasketArray.splice(index, 1);

        this._basket = newBasketArray;
    }

    public static GetInstance(_rootStore: RootStore): BasketStore {
        if (!BasketStore._Instance) {
            BasketStore._Instance = new BasketStore(_rootStore);
        }
        return BasketStore._Instance;
    }

    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get Basket(): ProductItem[] {
        return this._basket;
    }
}

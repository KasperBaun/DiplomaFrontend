import { makeAutoObservable, runInAction } from 'mobx';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import Category from '@models/Category';
import SubCategory from '@models/SubCategory';
import { ProductItemWeb } from '@models/ProductItemWeb';
import { ExtentionMethods } from '@utils/ExtentionMethods';

export class SearchStore {
    private static _Instance: SearchStore;
    private rootStore: RootStore;
    private prefix: string = `%c[SearchStore]`;
    private color: string = ComponentLoggingConfig.DarkGrey;

    /* Loading states */
    private _isLoading: boolean = false;
    private _isLoaded: boolean = false;

    /* State for searching products */
    private pageSizeAmount: number = 20;
    private _displayedProductItems: ProductItemWeb[] = [];
    private _displayedProductItemsCount: number = this.pageSizeAmount;
    private _filteredProductItems: ProductItemWeb[] = [];
    private _selectedCategory: Category = null;
    private _selectedSubcategory: SubCategory = null;
    private _selectedSubcategories: SubCategory[] = [];


    constructor(_rootStore: RootStore) {
        this.rootStore = _rootStore;
        makeAutoObservable(this);
        console.log(`${this.prefix} constructor called`, this.color);
    }

    public async init(): Promise<boolean> {
        runInAction(() => {
            if (!this._isLoaded && !this._isLoading) {
                this._isLoading = true;
                this.reset();
            }
        });

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
        runInAction(() => {
            this._isLoading = false;
            this._isLoaded = true;
        });
        return true;
    }

    public static GetInstance(_rootStore: RootStore): SearchStore {
        if (!SearchStore._Instance) {
            SearchStore._Instance = new SearchStore(_rootStore);
        }
        return SearchStore._Instance;
    }

    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    public get productItems(): ProductItemWeb[] {
        return this._filteredProductItems;
    }

    public get displayedProductItems(): ProductItemWeb[] {
        return this._displayedProductItems;
    }

    public get displayedProductItemsCount(): number {
        return this._displayedProductItemsCount;
    }
    public get displayedProductItemsLength(): number {
        return this._displayedProductItems.length;
    }

    public get pageSize(): number {
        return this.pageSizeAmount;
    }

    public get totalItemsCount(): number {
        return this._filteredProductItems.length;
    }

    public get selectedCategory(): Category {
        return this._selectedCategory;
    }

    public set selectedCategory(category: Category) {
        this._selectedCategory = category;
    }

    public get selectedSubcategory(): SubCategory {
        return this._selectedSubcategory;
    }

    public get selectedSubcategories(): SubCategory[] {
        return this._selectedSubcategories;
    }

    public set selectedSubcategories(subcategories: SubCategory[]) {
        runInAction(() => {
            this._selectedSubcategories = subcategories;
        });
    }

    public setSelectedSubcategory = (subcategory: SubCategory) => {
        runInAction(() => {
            this._selectedSubcategory = subcategory;
        });
    }

    public reset = () => {
        const allProducts = this.rootStore.webshopStore.ProductItems;
        const randomStartIndex = Math.floor(Math.random() * allProducts.length);
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(allProducts, randomStartIndex, randomStartIndex + this.displayedProductItemsCount);
        this._filteredProductItems = allProducts;
        this._selectedCategory = null;
        this._selectedSubcategory = null;
        this._selectedSubcategories = this.rootStore.webshopStore.subCategories;
    }

    public showMore = (): void => {
        runInAction(() => {
            this._displayedProductItemsCount += this.pageSizeAmount;
            this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this.displayedProductItemsCount);
        });
    }

    public filterBySubcategory = (subcategoryId: number) => {
        const subcategory = this.rootStore.webshopStore.subCategories.find(subcat => subcat.id === subcategoryId);
        this._selectedSubcategories = this.rootStore.webshopStore.subCategories.filter(subcat => subcat.categoryId === subcategory.categoryId);
        this._selectedSubcategory = subcategory;
        this._selectedCategory = this.rootStore.webshopStore.Categories.find(cat => cat.id === subcategory.categoryId);
        const filteredProducts = this.rootStore.webshopStore.ProductItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategory.id));
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this.displayedProductItemsCount);
    }

    public filterByCategory = (categoryId: number) => {
        this._selectedSubcategory = null;
        this._selectedCategory = this.rootStore.webshopStore.Categories.find(cat => cat.id === categoryId);
        this._selectedSubcategories = this.rootStore.webshopStore.subCategories.filter(subcat => subcat.categoryId === categoryId);
        const filteredProducts = this.rootStore.webshopStore.ProductItems.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this.displayedProductItemsCount);
    }

    public filterBySearchText = (searchText: string) => {

        const filteredProducts = this.rootStore.webshopStore.ProductItems.filter(
            productItem =>
                productItem.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                productItem.product.modelNumber.toString().includes(searchText.toLowerCase())
        );
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this.displayedProductItemsCount);
        this._selectedCategory = null;
        this._selectedSubcategory = null;
        this._selectedSubcategories = this.rootStore.webshopStore.subCategories;
    }
}
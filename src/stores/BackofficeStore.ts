import CategoryProductView from '@models/types/CategoryProductView';
import { makeAutoObservable, runInAction } from 'mobx';
import { APIService } from '@services/APIService';
import { ComponentLoggingConfig } from '@utils/ComponentLoggingConfig';
import { Constants } from '@utils/Constants';
import { RootStore } from './RootStore';
import { ProductItem } from '@models/ProductItem';
import { Product } from '@models/Product';
import { Category } from '@models/Category';
import { SubCategory } from '@models/SubCategory';
import { Image } from '@models/Image';
import { PriceHistory } from '@models/PriceHistory';
import { ProductDTO } from '@models/DTO/ProductDTO';
import { ProductItemDTO } from '@models/DTO/ProductItemDTO';
import { ProductItemDetails } from '@models/ProductItemDetails';
import { Payment } from '@models/Payment';
import { Order } from '@models/Order';
import { OrderElements } from '@models/OrderElements';
import { OrderDTO } from '@models/DTO/OrderDTO';
import { ChartData } from '@models/types/ChartData';
import { Notification } from '@models/types/Notification';
import { ExtentionMethods } from '@utils/ExtentionMethods';

export class BackofficeStore {

    private static _Instance: BackofficeStore;
    private rootStore: RootStore;
    private prefix: string = `%c[BackofficeStore]`;
    private color: string = ComponentLoggingConfig.DarkGreen;
    private apiService: APIService;

    /* Loading states */
    private loaded: boolean = false;
    private loading: boolean = false;

    /* Data arrays */
    private _categories: Category[] = [];
    private _subcategories: SubCategory[] = [];
    private _products: Product[] = [];
    private _productItems: ProductItem[] = [];
    private _images: Image[] = [];
    private _pricehistories: PriceHistory[] = [];
    private _payments: Payment[] = [];
    private _orders: Order[] = [];
    private _orderElements: OrderElements[] = [];
    private months: string[] = [];
    private _bestSellingProducts: Product[] = [];

    /* Views */
    public categoryProducts: CategoryProductView[] = [];
    public productItemDetails: ProductItemDetails[] = [];


    /* Maps for quick access */
    private _categoryMap: Map<number, Category> = new Map();
    private _subcategoryMap: Map<Number, SubCategory> = new Map();
    private _productMap: Map<number, Product> = new Map();
    private _productItemMap: Map<number, ProductItem> = new Map();
    private subcategoriesInCategoryMap: Map<Number, SubCategory[]> = new Map();

    /* Notifications */
    private _notifications: Notification[] = [];

    /* Chart data */
    private _chartDataByYearMap: Map<number, ChartData[]> = new Map();
    private _availableYears: number[] = [];

    /* State for searching products */
    private pageSizeAmount: number = 20;
    private _displayedProductItems: ProductItem[] = [];
    private _displayedProductItemsCount: number = this.pageSizeAmount;
    private _filteredProductItems: ProductItem[] = [];
    private _selectedCategory: Category = null;
    private _selectedSubcategory: SubCategory = null;
    private _selectedSubcategories: SubCategory[] = [];


    constructor(_rootStore: RootStore, _apiService: APIService) {
        this.apiService = _apiService;
        this.rootStore = _rootStore;
        makeAutoObservable(this);
    }

    public async init(): Promise<boolean> {
        runInAction(() => {
            this.loading = true;
        });

        // Get categories
        const categories = await this.apiService.getCategories();
        // Get subcategories
        const subcategories = await this.apiService.getSubCategories();
        // Get Images
        const images = await this.apiService.getImages();
        // Get Pricehistories
        const pricehistories = await this.apiService.getPriceHistories();
        runInAction(() => {
            this.months = this.getMonths();
            this._categories = categories;
            this._categoryMap = this.createCategoryMap(this._categories);

            this._subcategories = subcategories;
            this.mapCategoryToSubcategory(this._subcategories);
            this.subcategoriesInCategoryMap = this.mapSubCategoriesToCategoryId(this._subcategories);
            this._subcategoryMap = this.createSubcategoryMap(this._subcategories);
            this._images = images;
            this._pricehistories = pricehistories;
        })

        const productDTOs: ProductDTO[] = await this.apiService.getProductDTOs();
        runInAction(() => {
            this._products = this.generateProducts(productDTOs);
            this._productMap = this.createProductMap(this._products);
        });
        const productItemDTOs: ProductItemDTO[] = await this.apiService.getProductItemDTOs();
        const productItemDetails: ProductItemDetails[] = await this.apiService.getProductItemDetails();
        const categoryProductViews: CategoryProductView[] = await this.apiService.getCategoryProducts();
        runInAction(() => {
            this._productItems = this.generateProductItems(productItemDTOs, this._productMap);
            this._productItemMap = this.createProductItemsMap(this.productItems);
            this.productItemDetails = productItemDetails;
            this.categoryProducts = categoryProductViews;

        });

        const payments = await this.apiService.getPayments()
        const orderDTOs: OrderDTO[] = await this.apiService.getOrders();
        let orderElements: OrderElements[] = await this.apiService.getOrderElements();
        orderElements = this.mapOrderElementsToProductItems(orderElements, this.productItems);
        const orders = this.generateOrders(orderDTOs, orderElements, payments);


        runInAction(() => {
            this._payments = payments;
            this._orderElements = orderElements;
            this._orders = orders;
        })
        this.reset();

        const availableYears = this.calculateYearsAvailable(orders);
        const chartDataMap: Map<number, ChartData[]> = new Map<number, ChartData[]>();
        for (let year of availableYears) {
            chartDataMap.set(year, this.createChartDataByYear(year, orders, this.months));
        }

        const bestSellingProducts = await this.apiService.getBestSellingProducts(20);

        runInAction(() => {
            this._availableYears = availableYears;
            this._chartDataByYearMap = chartDataMap;
            this._bestSellingProducts = bestSellingProducts;
            this.loading = false;
            this.loaded = true;
        })

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }

        return this.loaded;
    }

    public static GetInstance(_rootStore: RootStore, _apiService: APIService): BackofficeStore {
        if (!BackofficeStore._Instance) {
            BackofficeStore._Instance = new BackofficeStore(_rootStore, _apiService);
        }
        return BackofficeStore._Instance;
    }

    public get isLoading(): boolean {
        return this.loading;
    }

    /* Orders */
    private generateOrders(ordersDTO: OrderDTO[], orderElements: OrderElements[], payments: Payment[]): Order[] {
        const orders: Order[] = [];
        for (let orderDTO of ordersDTO) {
            const orderPayment = payments.find(p => p.id === orderDTO.paymentId);
            const order: Order = new Order();
            order.id = orderDTO.id;
            order.customerId = orderDTO.customerId;
            order.paymentId = orderDTO.paymentId;
            order.payment = orderPayment ? orderPayment : null;
            order.deliveryStatus = orderDTO.deliveryStatus;
            order.discountCode = orderDTO.discountCode;
            order.active = orderDTO.active;
            order.orderElements = [];
            order.createdDate = new Date(orderDTO.createdDate);
            for (let orderElementId of orderDTO.orderElementIDs) {
                const orderElement = orderElements.find(oe => oe.id === orderElementId);
                if (orderElement) {
                    order.orderElements.push(orderElement);
                }

            }
            orders.push(order);
        }
        return orders;
    }

    private mapOrderElementsToProductItems(orderElementsDTO: OrderElements[], productItems: ProductItem[]): OrderElements[] {
        const orderElements: OrderElements[] = [];
        for (let orderElementDTO of orderElementsDTO) {
            const productItem = productItems.find(pi => pi.id === orderElementDTO.productItemId);
            if (productItem) {
                const orderElement: OrderElements = new OrderElements();
                orderElement.id = orderElementDTO.id;
                orderElement.orderId = orderElementDTO.orderId;
                orderElement.productItemId = orderElementDTO.productItemId;
                orderElement.productItem = productItem;
                orderElements.push(orderElement);
            }
        }
        return orderElements;
    }

    public get Orders(): Order[] {
        return this._orders;
    }

    /* Payments */
    public get Payments(): Payment[] {
        return this._payments;
    }


    public getPaymentsSortedByDate(direction: 'asc' | 'desc', amount?: number) {
        const directionCondition = direction === 'asc' ? 1 : -1;
        const sortedPayments = [...this._payments].sort(
            (a: Payment, b: Payment) =>
                directionCondition * (new Date(b.datePaid).getTime() - new Date(a.datePaid).getTime())
        );
        return sortedPayments.slice(0, amount ? amount : undefined);
    }

    public getPayment(id: number): Payment {
        return this._payments.find(p => p.id === id);
    }

    public async createPayment(payment: Payment): Promise<Payment> {
        return await this.apiService.createPayment(payment);
    }


    /* Categories & Subcategories */
    private createCategoryMap(categories: Category[]): Map<number, Category> {
        const map = new Map<number, Category>();
        for (const category of categories) {
            map.set(category.id, category);
        }
        return map;
    }
    private createSubcategoryMap(subCategories: SubCategory[]): Map<number, SubCategory> {
        const map = new Map<number, SubCategory>();
        for (const subcategory of subCategories) {
            map.set(subcategory.id, subcategory);
        }
        return map;
    }

    private mapSubCategoriesToCategoryId(subCategories: SubCategory[]): Map<Number, SubCategory[]> {

        const subcategoryMap = new Map<Number, SubCategory[]>();

        for (const cat of this._categories) {
            subcategoryMap.set(cat.id, [])
        }
        for (const subCat of subCategories) {
            const subcatMap = subcategoryMap.get(subCat.categoryId);
            if (subcatMap) {
                subcatMap.push(subCat);
            } else {
                console.error("SubCategoryStore.mapSubCategoriesToId -> Error mapping subcategory to category; subcategory: " + subCat.name + "with categoryId: " + subCat.categoryId + "could not find category in map");
            }
        }
        return subcategoryMap;
    }

    private mapCategoryToSubcategory(subCategories: SubCategory[]): void {

        for (let subCat of subCategories) {
            subCat.category = this._categories.find(cat => cat.id === subCat.categoryId);
        }
    }

    public async deleteSubCategory(id: number): Promise<boolean> {
        try {
            await this.apiService.deleteSubCategory(id);
            runInAction(() => {
                this._subcategories = this._subcategories.filter(subcat => subcat.id !== id);
            });
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }

    public async createSubCategory(subCategory: SubCategory): Promise<void> {
        try {
            const result = await this.apiService.createSubCategory(subCategory);
            result.category = this.getCategory(result.categoryId);

            runInAction(() => {
                this._subcategories.push(result);
            });
            return Promise.resolve();
        }
        catch (error) {
            console.log("Failed creating subcategory: ", error);
        }
    }
    public async updateSubCategory(subCategory: SubCategory): Promise<boolean> {
        try {
            const result = await this.apiService.updateSubCategory(subCategory);
            result.category = this.getCategory(result.categoryId);
            runInAction(() => {
                const index = this._subcategories.findIndex(subcat => subcat.id === result.id);
                this._subcategories[index] = result;
            });
        }
        catch (error) {
            console.log("Failed updating subcategory: ", error);
        }
        return;
    }


    /* Products & ProductItems */
    private generateProducts(productDTOs: ProductDTO[]): Product[] {
        const products: Product[] = [];
        for (const productDTO of productDTOs) {

            const productSubcategories: SubCategory[] = [];

            for (const subcatId of productDTO.subcategoryIds) {
                productSubcategories.push(this.getSubcategory(subcatId));
            }

            const product: Product = {
                id: productDTO.id,
                name: productDTO.name,
                modelNumber: productDTO.modelNumber,
                manufacturer: productDTO.manufacturer,
                design: productDTO.design,
                dimension: productDTO.dimension,
                material: productDTO.material,
                subcategories: productSubcategories
            }
            products.push(product);
        }

        return products;
    }

    private createProductMap(products: Product[]): Map<number, Product> {
        const prodMap: Map<number, Product> = new Map<number, Product>();
        for (const product of products) {
            const productExists = prodMap.get(product.id);
            if (!productExists) {
                prodMap.set(product.id, product);
            }
        }
        return prodMap;
    }

    private generateProductItems(productItemDTOs: ProductItemDTO[], productMap: Map<number, Product>): ProductItem[] {
        const productItems: ProductItem[] = [];
        for (const productItemDTO of productItemDTOs) {

            const poImages: Image[] = this._images.filter(img => img.productItemId === productItemDTO.id);
            const poPriceHistory: PriceHistory[] = this._pricehistories.filter(ph => ph.productItemId === productItemDTO.id);
            const createdDate = productItemDTO.createdDate ? new Date(productItemDTO.createdDate) : undefined;
            const soldDate = productItemDTO.soldDate ? new Date(productItemDTO.soldDate) : undefined;

            const productItem: ProductItem = {
                id: productItemDTO.id,
                productId: productItemDTO.productId,
                condition: productItemDTO.condition,
                quality: productItemDTO.quality,
                sold: false,
                weight: productItemDTO.weight,
                customText: productItemDTO.customText,
                product: productMap.get(productItemDTO.productId),
                purchasePrice: productItemDTO.purchasePrice,
                currentPrice: productItemDTO.currentPrice,
                createdDate: createdDate,
                soldDate: soldDate,
                images: poImages,
                priceHistories: poPriceHistory

            };
            productItems.push(productItem);
        }

        return productItems;
    }

    private createProductItemsMap(productItems: ProductItem[]): Map<number, ProductItem> {
        const prodItemMap: Map<number, ProductItem> = new Map<number, ProductItem>();
        for (const prodItem of productItems) {
            const productItemExists = prodItemMap.get(prodItem.id);
            if (!productItemExists) {
                prodItemMap.set(prodItem.id, prodItem);
            }
        }
        return prodItemMap;
    }

    public async deleteProductItem(id: number): Promise<boolean> {
        await this.apiService.deleteProductItem(id);
        return;
    }
    public getProduct(id: number): Product {
        return this._productMap.get(id);
    }
    public getProductItem(id: number): ProductItem {
        return this._productItemMap.get(id);
    }
    public get ProductItems(): ProductItem[] {
        return this.productItems;
    }
    public get isLoaded(): boolean {
        return this.loaded;
    }

    public get productItems(): ProductItem[] {
        return this._productItems;
    }
    public get subCategories(): SubCategory[] {
        return this._subcategories;
    }

    public subCategoriesByCategoryID(categoryId: Number): SubCategory[] {
        const result = this.subcategoriesInCategoryMap.get(categoryId);
        if (!result) {
            return [];
        } else {
            return result;
        }
    }

    public getSubcategory(id: number): SubCategory {
        return this._subcategoryMap.get(id);
    }


    /* Categories */

    public get Categories(): Category[] {
        return this._categories;
    }

    public getCategory(id: number): Category {
        return this._categories.find(c => c.id === id);
    }

    public async createCategory(category: Category): Promise<void> {
        try {
            await this.apiService.createCategory(category).then((result) => {
                runInAction(() => {
                    this._categories.push(result);
                }
                )
            });
        } catch (err) {
            console.log("Failed creating new category. Error: ", err);
        }
    }

    public async deleteCategory(id: number): Promise<void> {
        await this.apiService.deleteCategory(id);
        runInAction(() => {
            this._categories = this._categories.filter(c => c.id !== id);
        })
    }

    public async updateCategory(category: Category): Promise<void> {
        try {
            await this.apiService.updateCategory(category);
            runInAction(() => {
                const index = this._categories.findIndex(c => c.id === category.id);
                this._categories[index] = category;
            });
        } catch (err) {
            console.log("Failed creating new category. Error: ", err);
        }
    }

    /* Chartdata */
    public getChartData(year: number, months?: number[]) {
        let result: ChartData[] = [];
        if (!months) {
            result = this._chartDataByYearMap.get(year);
        } else {
            result = this._chartDataByYearMap.get(year).filter(data => months.includes(data.monthInt));
        }

        return result;
    }

    private calculateYearsAvailable(orders: Order[]): number[] {
        const years: number[] = [];
        for (var order of orders) {
            if (!years.includes(order.createdDate.getFullYear())) {
                years.push(order.createdDate.getFullYear());
            }
        }
        return years.sort((a, b) => b - a);
    }

    public getYearsAvailable(): number[] {
        return this._availableYears;
    }

    getStorageValue() {
        let storageValue: number = 0;
        for (var productItem of this._productItems.filter(p => p.soldDate === null || p.soldDate === undefined)) {
            storageValue += productItem.currentPrice;
        }
        return storageValue;
    }

    public createChartDataByYear(year: number, orders: Order[], months: string[]): ChartData[] {
        const orderData = orders.filter(o => o.createdDate.getFullYear() === year);

        const data = months.map((month, index) => {
            const monthInt = index + 1;
            const ordersInMonth = orderData.filter(o => o.createdDate.getMonth() + 1 === monthInt);
            let monthRevenue = 0;
            for (var order of ordersInMonth) {
                monthRevenue += this.getPayment(order.paymentId).amount;
            }

            const randomExpenseAmount = monthRevenue * (Math.random() * (0.85 - 0.35) + 0.35);

            return { month: month, monthInt: monthInt, revenue: monthRevenue, expenses: randomExpenseAmount };
        });

        return data;
    }

    public getOrdersByYear(year: number): Order[] {
        return this._orders.filter(o => o.createdDate.getFullYear() === year);
    }

    private getMonths(): string[] {
        return [
            this.rootStore.languageStore.currentLanguage.jan,
            this.rootStore.languageStore.currentLanguage.feb,
            this.rootStore.languageStore.currentLanguage.mar,
            this.rootStore.languageStore.currentLanguage.apr,
            this.rootStore.languageStore.currentLanguage.may,
            this.rootStore.languageStore.currentLanguage.jun,
            this.rootStore.languageStore.currentLanguage.jul,
            this.rootStore.languageStore.currentLanguage.aug,
            this.rootStore.languageStore.currentLanguage.sep,
            this.rootStore.languageStore.currentLanguage.oct,
            this.rootStore.languageStore.currentLanguage.nov,
            this.rootStore.languageStore.currentLanguage.dec,
        ];
    }

    public get BestSellingProducts(): Product[] {
        return this._bestSellingProducts;
    }

    /* Notfications */
    public get Notifications(): Notification[] {
        return this._notifications;
    }
    public removeNotification(notification: Notification): void {
        runInAction(() => {
            this._notifications = this._notifications.filter(n => n !== notification);
        })
    }
    public addNotification(notification: Notification): void {
        runInAction(() => {
            this._notifications.push(notification);
        })
    }
    public clearAllNotifications(): void {
        runInAction(() => {
            this._notifications = [];
        })
    }

    /* Search logic */
    public get selectedSubcategories(): SubCategory[] {
        return this._selectedSubcategories;
    }

    public get displayedProductItemsCount(): number {
        return this._displayedProductItemsCount;
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

    public set selectedSubcategories(subcategories: SubCategory[]) {
        runInAction(() => {
            this._selectedSubcategories = subcategories;
        });
    }

    public setSelectedSubcategory = (subcategory: SubCategory) => {
        this._selectedSubcategory = subcategory;
    }

    public reset = () => {
        const allProducts = this._productItems;
        const randomStartIndex = Math.floor(Math.random() * allProducts.length);
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(allProducts, randomStartIndex, randomStartIndex + this.displayedProductItemsCount);
        this._filteredProductItems = allProducts;
        this._selectedCategory = null;
        this._selectedSubcategory = null;
        this._selectedSubcategories = this.subCategories;
    }

    public showMore = (): void => {
        this._displayedProductItemsCount += this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this._displayedProductItemsCount);
    }

    public filterBySubcategory = (subcategoryId: number) => {
        const subcategory = this._subcategories.find(subcat => subcat.id === subcategoryId);
        this._selectedSubcategories = this._subcategories.filter(subcat => subcat.categoryId === subcategory.categoryId);
        this._selectedSubcategory = subcategory;
        this._selectedCategory = this._categories.find(cat => cat.id === subcategory.categoryId);
        const filteredProducts = this._productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.id === subcategory.id));
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this._displayedProductItemsCount);
    }

    public filterByCategory = (categoryId: number) => {
        this._selectedSubcategory = null;
        this._selectedCategory = this._categories.find(cat => cat.id === categoryId);
        this._selectedSubcategories = this._subcategories.filter(subcat => subcat.categoryId === categoryId);
        const filteredProducts = this._productItems.filter(prodItem => prodItem.product.subcategories.some(s => s.categoryId === categoryId));
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this._displayedProductItemsCount);
    }

    public filterBySearchText = (searchText: string) => {

        const filteredProducts = this._productItems.filter(
            productItem =>
                productItem.product.name.toLowerCase().includes(searchText.toLowerCase()) ||
                productItem.product.modelNumber.toString().includes(searchText.toLowerCase())
        );
        this._filteredProductItems = filteredProducts;
        this._displayedProductItemsCount = this.pageSizeAmount;
        this._displayedProductItems = ExtentionMethods.safeSlice(this._filteredProductItems, 0, this._displayedProductItemsCount);
        this._selectedCategory = null;
        this._selectedSubcategory = null;
        this._selectedSubcategories = this._subcategories;
    }

    public get displayedProductItems(): ProductItem[] {
        return this._displayedProductItems;
    }
}


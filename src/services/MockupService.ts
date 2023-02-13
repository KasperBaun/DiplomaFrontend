import Category from "../models/Category";
import Product from "../models/Product";
import { ComponentLoggingConfig } from "../utils/ComponentLoggingConfig";
import { Constants } from "../utils/Constants";
import { productMockupData, categories } from "./MockupData";

export class MockupService {
  

    private prefix: string = `%c[MockupService]`;
    private color: string = ComponentLoggingConfig.DarkBlue;
    private products: Product[] = productMockupData;
    private categories: Category[] = categories;

    constructor() {

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }

    public async getCategories() : Promise<Category[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.categories;
    }

    public async getCategory(productId: number) : Promise<Category>{
        await  new Promise(resolve => setTimeout(resolve, 1000));
        return this.categories[productId];
    }

    public async getProducts(){

    }

    public async getProduct(productId: number): Promise<Product> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.products[productId];
    }
}
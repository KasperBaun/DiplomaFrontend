
import Category from "../models/Category";
import { ComponentLoggingConfig } from "../utils/ComponentLoggingConfig";
import { Constants } from "../utils/Constants";
import IAPIService from "./IAPIService";

class APIService implements IAPIService {


    private prefix: string = `%c[APIService]`;
    private color: string = ComponentLoggingConfig.DarkBlue;
    private apiBaseUrl: string;


    constructor(_apiBaseUrl: string) {
        this.apiBaseUrl = _apiBaseUrl;

        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }

    getCategories: () => Category[];

    async createCategory(category: Category): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} creating category with title: ${category.name} `, this.color);
        }

        // DO API stuff
        console.log("apiUrl", this.apiBaseUrl);
        await fetch(this.apiBaseUrl + "/Category", {
            method: 'POST',
            body: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        }).then(result => {
            if (result.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully created category with title: ${category.name} `, t1, t2, this.color);
                }
                return;
            } else {
                console.log(`${this.prefix} failed creating category with title: ${category.name}. Status: ${result.status} ${result.statusText} `, this.color);
            }
        })
    }


}

export default APIService;
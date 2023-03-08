
import Category from "@models/Category";
import SubCategory from "@models/SubCategory";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { Constants } from "@utils/Constants";
import IAPIService from "./IAPIService";
import SubCategory from "@models/SubCategory";

export interface WebAPIResponse {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: any;
}

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
    async getSubcategories(): Promise<SubCategory[]> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} fetching categories`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Subcategory`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched subcategories from API. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                try {
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }

            } else {
                console.log(`${this.prefix} failed fetching subcategories from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    async createSubcategory(subcategory: SubCategory): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to create subcategory with name ${subcategory.name}`, this.color);
        }

        try {
            console.log("we here");
            const response = await fetch(`${this.apiBaseUrl}/Subcategory`, {
                method: 'POST',
                body: JSON.stringify(subcategory),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });

            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully created subcategory with name ${subcategory.name}. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return {
                    success: true,
                    statusCode: response.status,
                    message: response.statusText,
                    data: response.body
                }
            } else {
                console.log(`${this.prefix} failed creating subcategory with name ${subcategory.name}. Status: ${response.status} ${response.statusText}`, this.color);
                return {
                    success: false,
                    statusCode: response.status,
                    message: response.statusText
                }
            }
        } catch (error) {
            console.error("Error", error);
        }
    }

    async deleteSubcategory(id: number): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }

    async getCategories(): Promise<Category[]> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} fetching categories`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Category`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched categories from API. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                try {
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }

            } else {
                console.log(`${this.prefix} failed fetching categories from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    async createCategory(category: Category): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} creating category with title: ${category.name} `, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Category`, {
                method: 'POST',
                body: JSON.stringify(category),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully created category. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return;

            } else {
                console.log(`${this.prefix} failed creating category with title: ${category.name}. Status: ${response.status} ${response.statusText} `, this.color);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async updateCategory(category: Category, id : number): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} updating category with id: ${category.id} `, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Category/${id}`, {
                method: 'PUT',
                body: JSON.stringify(category),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            console.log(response.statusText)
            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully updated category. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return;

            } else {
                console.log(`${this.prefix} failed to update category with id: ${category.id}. Status: ${response.status} ${response.statusText} `, this.color);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async deleteCategory(id: number): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} deleting category with id: ${id} `, this.color);
        }

        try {
            const response = await fetch(this.apiBaseUrl + "/Category/" + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully deleted category with id: ${id} `, t1, t2, this.color);
                }
                return {
                    success: true,
                    message: `successfully deleted category with id: ${id}`,
                    statusCode: 200,
                };
            } else {
                console.log(`${this.prefix} failed to delete category with id: ${id}. Status: ${response.status} ${response.statusText} `, this.color);
                return {
                    success: false,
                    message: `failed to delete category with id: ${id}. Status: ${response.status} ${response.statusText} `,
                    statusCode: 500,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }


}

export default APIService;
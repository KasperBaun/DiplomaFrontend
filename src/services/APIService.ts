
import Category from "@models/Category";
import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { Constants } from "@utils/Constants";
import IAPIService, { WebAPIResponse } from "./IAPIService";
import SubCategory from "@models/SubCategory";
import Payment from "@models/Payment";
import Product from "@models/Product";
import ProductItem from "@models/ProductItem";



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
        /* Product Iems */
    createProductItem(productItem: ProductItem): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }
    getProductItem(id: number): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }
    updateProductItem(productItem: ProductItem): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }
    deleteProductItem(id: number): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }

    async getProductItems(): Promise<ProductItem[]> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} fetching product Items`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/ProductItem`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched product Items from API. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                try {
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }

            } else {
                console.log(`${this.prefix} failed fetching product Items from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    
    /* Products */
    async createProduct(product: Product): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to create Product with name ${product.name}`, this.color);
        }

        try {
            console.log("we here");
            const response = await fetch(`${this.apiBaseUrl}/Product`, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });

            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully created Product with name ${product.name}. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return {
                    success: true,
                    statusCode: response.status,
                    message: response.statusText,
                    data: response.body
                }
            } else {
                console.log(`${this.prefix} failed creating Product with name ${product.name}. Status: ${response.status} ${response.statusText}`, this.color);
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
    
    getProduct(id: number): Promise<WebAPIResponse> {
        throw new Error("Method not implemented.");
    }
 
    async updateProduct(product: Product): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to update product with name ${product.name}`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Product/${product.id}`, {
                method: 'PUT',
                body: JSON.stringify(product),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });

            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully updated product with name ${product.name}. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return {
                    success: true,
                    statusCode: response.status,
                    message: response.statusText,
                    data: response.body
                }
            } else {
                console.log(`${this.prefix} failed updating product with name ${product.name}. Status: ${response.status} ${response.statusText}`, this.color);
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

    async deleteProduct(id: number): Promise<WebAPIResponse>  {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} deleting Product with id: ${id} `, this.color);
        }

        try {
            const response = await fetch(this.apiBaseUrl + "/Product/" + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully deleted Product with id: ${id} `, t1, t2, this.color);
                }
                return {
                    success: true,
                    message: `successfully deleted Product with id: ${id}`,
                    statusCode: 200,
                };
            } else {
                console.log(`${this.prefix} failed to delete Product with id: ${id}. Status: ${response.status} ${response.statusText} `, this.color);
                return {
                    success: false,
                    message: `failed to delete Product with id: ${id}. Status: ${response.status} ${response.statusText} `,
                    statusCode: 500,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }
    async getProducts(): Promise<Product[]> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} fetching products`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Product`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched products from API. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                try {
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }

            } else {
                console.log(`${this.prefix} failed fetching products from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }



    /* Subcategories */
    async getSubCategories(): Promise<SubCategory[]> {
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

    async createSubCategory(subcategory: SubCategory): Promise<WebAPIResponse> {
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
    async updateSubCategory(subcategory: SubCategory): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to update subcategory with name ${subcategory.name}`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Subcategory/${subcategory.id}`, {
                method: 'PUT',
                body: JSON.stringify(subcategory),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });

            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully updated subcategory with name ${subcategory.name}. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return {
                    success: true,
                    statusCode: response.status,
                    message: response.statusText,
                    data: response.body
                }
            } else {
                console.log(`${this.prefix} failed updating subcategory with name ${subcategory.name}. Status: ${response.status} ${response.statusText}`, this.color);
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

    async deleteSubCategory(id: number): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to delete subcategory with id: ${id} `, this.color);
        }

        try {
            const response = await fetch(this.apiBaseUrl + "/Subcategory/" + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully deleted subcategory with id: ${id} `, t1, t2, this.color);
                }
                return {
                    success: true,
                    message: `successfully deleted category with id: ${id}`,
                    statusCode: response.status,
                };
            } else {
                console.log(`${this.prefix} failed to delete subcategory with id: ${id}. Status: ${response.status} ${response.statusText} `, this.color);
                return {
                    success: false,
                    message: `failed to delete category with id: ${id}. Status: ${response.status} ${response.statusText} `,
                    statusCode: response.status,
                };
            }
        } catch (error) {
            console.error(error);
        }
    }

    /* Categories */
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

    async updateCategory(category: Category): Promise<WebAPIResponse> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} attempting to update subcategory with name ${category.name}`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Category/${category.id}`, {
                method: 'PUT',
                body: JSON.stringify(category),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });

            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully updated category with name ${category.name}. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return {
                    success: true,
                    statusCode: response.status,
                    message: response.statusText,
                    data: response.body
                }
            } else {
                console.log(`${this.prefix} failed updating category with name ${category.name}. Status: ${response.status} ${response.statusText}`, this.color);
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
    
    //////////////////////////// Payment

    async getPayments(): Promise<Payment[]> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} fetching payments`, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Payment`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.ok) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched payments from API. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                try {
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error(error);
                    return [];
                }

            } else {
                console.log(`${this.prefix} failed fetching payments from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    async createPayment(payment: Payment): Promise<void> {
        const t1 = performance.now();
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} creating payment with date: ${payment.datePaid} `, this.color);
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/Payment`, {
                method: 'POST',
                body: JSON.stringify(payment),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            });
            if (response.status === 200) {
                if (Constants.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully created payment. Statuscode: ${response.status}`, t1, t2, this.color);
                }
                return;

            } else {
                console.log(`${this.prefix} failed creating payment with date: ${payment.datePaid}. Status: ${response.status} ${response.statusText} `, this.color);
            }
        } catch (error) {
            console.error(error);
        }
    }

}

export default APIService;
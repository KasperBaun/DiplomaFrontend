import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { ICrudHelper } from "./ICrudHelper";

export class CrudHelper implements ICrudHelper {
    private prefix: string = `[CrudHelper]`;
    private color: string = ComponentLoggingConfig.Lightkhaki;
    private loggingEnabled: boolean;
    private headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };
    private mode: RequestMode = 'cors';

    constructor(loggingEnabled: boolean) {
        this.loggingEnabled = loggingEnabled;
        this.log(`initialized!`);
    }

    private getPastTense(method: string): string {
        switch (method.toLowerCase()) {
            case 'post': return 'created';
            case 'get': return 'retrieved';
            case 'put': return 'updated';
            case 'delete': return 'deleted';
            default: return method.toLowerCase();
        }
    }

    private log(message: string): void {
        if (this.loggingEnabled) {
            console.log(`%c${this.prefix} ${message}`, `color: ${this.color};`);
        }
    }

    private async request<T>(apiUrl: string, method: string, objectName: string, body?: T): Promise<T> {
        const t1 = performance.now();
        this.log(`attempting to ${method.toLowerCase()} ${objectName}`);

        try {
            const response = await fetch(apiUrl, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: this.headers,
                mode: this.mode
            });

            if (response.ok) {
                const t2 = performance.now();
                const pastTenseMethod = this.getPastTense(method);
                const message = `Status: (${response.status}) StatusMessage: (${response.statusText}) - successfully ${pastTenseMethod} ${objectName}`;
                ComponentLoggingConfig.printPerformanceMessage(`%c${this.prefix} ${message}`, t1, t2, `color: ${this.color};`);

                // Check if the response has content to parse as JSON
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return method === 'DELETE' ? undefined : null;
                }
            } else {
                this.log(`failed ${method.toLowerCase()}ing ${objectName}. Status: ${response.status} ${response.statusText}`);
                return;
            }
        } catch (error) {
            throw new Error(`CrudHelper Error: ${error}`);
        }
    }


    create<T>(apiUrl: string, objectName: string, object: T): Promise<T> {
        return this.request(apiUrl, 'POST', objectName, object);
    }

    update<T>(apiUrl: string, objectName: string, object: T): Promise<T> {
        return this.request(apiUrl, 'PUT', objectName, object);
    }

    delete(apiUrl: string, objectName: string): Promise<void> {
        return this.request(apiUrl, 'DELETE', objectName);
    }

    readMultiple<T>(apiUrl: string, objectName: string): Promise<T[]> {
        return this.request(apiUrl, 'GET', objectName);
    }

    readSingle<T>(apiUrl: string, objectName: string): Promise<T> {
        return this.request(apiUrl, 'GET', objectName);
    }
}

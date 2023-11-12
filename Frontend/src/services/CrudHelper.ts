import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { ICrudHelper } from "./ICrudHelper";

export class CrudHelper implements ICrudHelper {

    private prefix: string = `%c[CrudHelper]`;
    private color: string = ComponentLoggingConfig.Lightkhaki;
    private loggingEnabled: boolean = false;
    private headers: HeadersInit = {
        'content-type': 'application/json',
        'access-control-allow-origin': '*'
    };
    private mode: RequestMode = 'cors';

    constructor(_loggingEnabled: boolean) {
        this.loggingEnabled = _loggingEnabled;
        if (this.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }
    async create<T>(apiUrl: string, objectName: string, object: T): Promise<T> {
        const t1 = performance.now();
        if (this.loggingEnabled) {
            console.log(`${this.prefix} attempting to create ${objectName}`, this.color);
        }

        try {
            //console.log(`${this.prefix} apiUrl ${apiUrl}`, this.color);
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: this.headers,
                mode: this.mode
            });

            console.log(`${this.prefix} response ${response}`, this.color);

            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText}) - successfully created ${objectName}`, t1, t2, this.color);
                }
                return response.json() as T;
            } else {
                console.log(`${this.prefix} failed creating ${objectName}. Status: ${response.status} ${response.statusText}`, this.color);
                return null;
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    async update<T>(apiUrl: string, objectName: string, object: T): Promise<T> {
        const t1 = performance.now();
        if (this.loggingEnabled) {
            console.log(`${this.prefix} attempting to update ${objectName}`, this.color);
        }

        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'PUT',
                body: JSON.stringify(object),
                headers: this.headers,
                mode: this.mode
            });

            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText}) - successfully updated ${objectName}`, t1, t2, this.color);
                }
                return await response.json() as T;
            } else {
                console.log(`${this.prefix} failed updating ${objectName}. Status: ${response.status} ${response.statusText}`, this.color);
                return null;
            }
        } catch (error) {
            console.error("Error", error);
        }
    }
    async delete(apiUrl: string, objectName: string): Promise<void> {
        const t1 = performance.now();
        if (this.loggingEnabled) console.log(`${this.prefix} attempting to delete ${objectName}`, this.color);

        try {
            const response = await fetch(`${apiUrl}`,
                {
                    method: 'DELETE',
                    headers: this.headers,
                    mode: this.mode

                });
            if (response.ok) {
                if (this.loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText}) - successfully deleted ${objectName}`, t1, t2, this.color);
                }
                return;
            } else {
                console.log(`${this.prefix} failed deleting ${objectName} from API. Status: ${response.status} ${response.statusText}`, this.color);
                return;
            }
        } catch (error) {
            console.error(error);
        }
    }
    async readMultiple<T>(apiUrl: string, objectName: string): Promise<T[]> {
        const t1 = performance.now();
        if (this.loggingEnabled) console.log(`${this.prefix} fetching ${objectName}`, this.color);

        try {
            const response = await fetch(`${apiUrl}`,
                {
                    method: 'GET',
                    headers: this.headers,
                    mode: this.mode
                });
            if (response.ok || response.status === 200) {
                try {
                    const data = await response.json();
                    if (this.loggingEnabled) {
                        const t2 = performance.now();
                        ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText}) - successfully fetched ${objectName}`, t1, t2, this.color);
                    }
                    return data as T[];
                } catch (err) {
                    console.error('error', err);
                    return [];
                }
            } else {
                console.log(`${this.prefix} failed fetching ${objectName} from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }
    async readSingle<T>(apiUrl: string, objectName: string): Promise<T> {
        const t1 = performance.now();
        if (this.loggingEnabled) console.log(`${this.prefix} fetching ${objectName}`, this.color);

        try {
            const response = await fetch(`${apiUrl}`,
                {
                    method: 'GET',
                    headers: this.headers,
                    mode: this.mode

                });
            if (response.ok) {
                try {
                    const data = await response.json();
                    if (this.loggingEnabled) {
                        const t2 = performance.now();
                        ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} Status: (${response.status}) Statusmessage: (${response.statusText}) - successfully fetched ${objectName}`, t1, t2, this.color);
                    }
                    return data as T;
                } catch (err) {
                    console.error('error', err);
                    return null;
                }
            } else {
                console.error(`${this.prefix} failed fetching ${objectName} from API. Status: ${response.status} ${response.statusText}`, this.color);
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
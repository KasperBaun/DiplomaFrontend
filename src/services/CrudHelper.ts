

import { ComponentLoggingConfig } from "@utils/ComponentLoggingConfig";
import { Constants } from "@utils/Constants";
import { ICrudHelper } from "./ICrudHelper";


class CrudHelper implements ICrudHelper {

    private prefix: string = `%c[CrudHelper]`;
    private color: string = ComponentLoggingConfig.DarkBlue;

    constructor() {
        if (Constants.loggingEnabled) {
            console.log(`${this.prefix} initialized!`, this.color);
        }
    }
    async readMultiple<T>(apiUrl: string, loggingEnabled: boolean, objectName: string): Promise<T[]> {
        const t1 = performance.now();
        loggingEnabled ? console.log(`${this.prefix} fetching ${objectName}`, this.color) : null;

        try {
            const response = await fetch(`${apiUrl}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
                });
            if (response.ok) {
                const data = await response.json();
                if (loggingEnabled) {
                    const t2 = performance.now();
                    ComponentLoggingConfig.printPerformanceMessage(`${this.prefix} successfully fetched ${objectName}. Status: ${response.status} ${response.statusText}`, t1, t2, this.color);
                }
                return data as T[];
            } else {
                console.log(`${this.prefix} failed fetching ${objectName} from API. Status: ${response.status} ${response.statusText}`, this.color);
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    }

    readSingle<T>(apiUrl: string, loggingEnabled: boolean, objectName: string): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

export default CrudHelper;
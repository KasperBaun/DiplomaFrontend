export interface ICrudHelper {
    readMultiple<T>(apiUrl: string, loggingEnabled: boolean, objectName: string): Promise<T[]>;
    readSingle<T>(apiUrl: string, loggingEnabled: boolean, objectName: string): Promise<T>;
}
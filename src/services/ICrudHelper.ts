export interface ICrudHelper {
    readMultiple<T>(apiUrl: string, objectName: string): Promise<T[]>;
    readSingle<T>(apiUrl: string, objectName: string): Promise<T>;
    create<T>(apiUrl: string, objectName: string, object: T): Promise<void>;
    update<T>(apiUrl: string, objectName: string, object: T): Promise<T>;
    delete<T>(apiUrl: string, objectName: string, object: T): Promise<void>;
}
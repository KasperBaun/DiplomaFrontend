export type WebAPIResponse = {
    success: boolean;
    message?: string;
    statusCode: number;
    data?: any | any[];
}
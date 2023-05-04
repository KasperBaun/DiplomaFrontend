import { ProductItem } from "./ProductItem";

export default class Basket{
    id: number;
    proceededToCheckOut: boolean; 
    createdTime: Date; 
    lastEditTime: Date;  
    productList: ProductItem[]
};
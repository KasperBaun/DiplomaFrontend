import ProductItem from "./ProductItem";

export default class Basket{
    id: number;
    active: boolean; 
    createdTime: Date; 
    editTime: Date;  
    productList: ProductItem[]
};
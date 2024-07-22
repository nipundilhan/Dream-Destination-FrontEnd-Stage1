import { OrderDetails } from "./order-details";

export interface UnreadMessages{
    id : number,
    email : string,
    message : string,
    readByCustomer : string,
    readByShop :  string,
    createdDate : string,
    orderId : number,
 }
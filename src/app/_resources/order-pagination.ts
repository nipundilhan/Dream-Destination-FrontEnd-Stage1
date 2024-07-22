import { OrderDetails } from "./order-details";

export class OrderPagination{
    items:OrderDetails[];
    meta:{
        totalItems: number;
        pageNumber: number;
        pageSize: number;
    }

}
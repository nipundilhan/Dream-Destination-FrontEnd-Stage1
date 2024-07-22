import { Product } from "./product";

export class ProductPagination{
    items:Product[];
    meta:{
        totalItems: number;
        pageNumber: number;
        pageSize: number;
    }

}
export class ProductSearch{
    rootProductTypeId : number;
    productTypeId : number;
    companyId : number;
    brandId : number;
    searchText : string | null;


    constructor(rootProductTypeId : number ,productIds : number,companyId : number ,brandId : number,searchText : string|null  ){
        this.rootProductTypeId = rootProductTypeId;
        this.productTypeId = productIds;
        this.companyId = companyId;
        this.brandId = brandId;
        this.searchText = searchText;
    }
 }
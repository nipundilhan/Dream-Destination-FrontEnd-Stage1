import { FileHandle } from "./file-handle";

export interface ProductUpload{
    id : null | number,
    code : null | string,
    productName : null | string,
    description : string,
    productActualPrice : null | number,
    quantity :  number,
    brandId : null | number,
    productTypeId : null | number,
    productImages : FileHandle[],
    mainImage : FileHandle[]
 }
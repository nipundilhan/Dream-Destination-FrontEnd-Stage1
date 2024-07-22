import { FileHandle } from "./file-handle";

export interface Product{
   id : null | number,
   code : null | string,
   productName : null | string,
   description : string,
   quantity :  number,
   productActualPrice : null | number,
   productImages : FileHandle[]
}
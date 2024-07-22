import { FileHandle } from "./file-handle";

export interface Tour{
   id : null | number,
   name : null | string,
   abstractDescription : null | string,
   description : string,
   price : null | string,
   productImages : FileHandle[]
}
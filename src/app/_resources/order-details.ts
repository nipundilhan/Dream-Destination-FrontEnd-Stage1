import { CommanCharge } from "./comman-charge";
import { OrderMessage } from "./order-message";
import { StockDetails } from "./stock-details";

export interface OrderDetails{
    id : null | number,
    delivaryName : null | string,
    delivaryAddress : null | string,
    email : null | string,
    contactNo : string,
    note :  string,
    orderDate : null | string,
    status : null | string,
    orderTotal : null | number,
    stock : StockDetails[],
    additionalCharges : CommanCharge[],
    deductions : CommanCharge[],
    messages : OrderMessage[],
    initialItemsTotal :null | number,
    interimTotal : null | number,
    chargesTotal : null | number,
    deductionTotal :null | number
 }
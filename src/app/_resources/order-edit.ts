import { CommanCharge } from "./comman-charge";
import { StockDetails } from "./stock-details";

export interface OrderEdit{
    id : null | number,
    stock : StockDetails[],
    interimStock : StockDetails[],
    charges : CommanCharge[],
    deductions : CommanCharge[],

 }
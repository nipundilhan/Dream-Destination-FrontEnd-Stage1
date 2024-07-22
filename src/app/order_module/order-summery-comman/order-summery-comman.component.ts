import { Component, OnInit } from '@angular/core';
import { CommanCharge } from 'src/app/_resources/comman-charge';
import { OrderDetails } from 'src/app/_resources/order-details';
import { StockDetails } from 'src/app/_resources/stock-details';

@Component({
  selector: 'app-order-summery-comman',
  templateUrl: './order-summery-comman.component.html',
  styleUrls: ['./order-summery-comman.component.css']
})
export class OrderSummeryCommanComponent implements OnInit {

  email : any;
  contactNo: any;
  delivaryName : any;
  delivaryAddress : any;
  orderDate: any;
  orderTotal : any;
  status: any;
  note:any;

  deductionsTotal : any;
  chargesTotal : any;
  suggestedItemsTotal:any;
  initialItemsTotal:any;
  predictedTotal:any;

  constructor() { }

  ngOnInit(): void {
  }

  public loadData(data : OrderDetails ){
    this.email = data.email;
    this.contactNo = data.contactNo;
    this.delivaryName= data.delivaryName;
    this.orderDate= data.orderDate;
    this.orderTotal= data.orderTotal;
    this.status= data.status;
    this.note= data.note;
    this.delivaryAddress = data.delivaryAddress;

    this.initialItemsTotal = data.initialItemsTotal;
    this.suggestedItemsTotal =data.interimTotal;
    this.deductionsTotal = data.deductionTotal;
    this.chargesTotal = data.chargesTotal;
    this.predictedTotal = this.suggestedItemsTotal+this.orderTotal;
  }

/*
  getOrderTotal(stk :StockDetails[]){

    let OrderTotal = 0;

    stk.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }

  getChargesTotal(chrgs :CommanCharge[]){

    let chargesTotal = 0;

    chrgs.forEach(
      (item)=>{
        chargesTotal = chargesTotal+item.amount;
      }
    );

    return chargesTotal;
  }

  getTotalDiscount(ddctns :CommanCharge[] ){

    let discountTotal = 0;

    ddctns.forEach(
      (item)=>{
        discountTotal = discountTotal+item.amount;
      }
    );

    return discountTotal;
  }
  */

}

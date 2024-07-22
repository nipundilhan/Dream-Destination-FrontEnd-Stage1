import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommanCharge } from 'src/app/_resources/comman-charge';
import { OrderDetails } from 'src/app/_resources/order-details';
import { StockDetails } from 'src/app/_resources/stock-details';
import { StockDetailsError } from 'src/app/_resources/stock-details-error';

@Component({
  selector: 'app-order-details-comman',
  templateUrl: './order-details-comman.component.html',
  styleUrls: ['./order-details-comman.component.css']
})
export class OrderDetailsCommanComponent implements OnInit {

  displayedColumns2: string[] = [ 'name', 'amount', 'quantity'  ,  'total'  ];
  ordrDt2 : OrderDetails;

  stockDestailsList2 = new MatTableDataSource<StockDetailsError>();
  @ViewChild('paginatorOrderItems2') paginatorOrderItems2: MatPaginator;  
  additionalCharges2 : CommanCharge[] = [];
  deductions2 : CommanCharge[] = [];

  email : any;
  contactNo: any;
  delivaryName : any;
  delivaryAddress : any;
  orderDate: any;
  orderTotal : any;
  status: any;
  note:any;

  ordrDt3 : OrderDetails;

  // input is not working with mat-paginator
  //@Input() ordrDt3 : OrderDetails ;
  

  constructor() { }

  ngOnInit(): void {


  }

  public loadData(data : OrderDetails , stck : StockDetailsError[]){


    
    this.stockDestailsList2 = new MatTableDataSource(stck);
    this.stockDestailsList2.paginator = this.paginatorOrderItems2;
    this.additionalCharges2 = data.additionalCharges;
    this.deductions2 = data.deductions;

    this.email = data.email;
    this.contactNo = data.contactNo;
    this.delivaryName= data.delivaryName;
    this.orderDate= data.orderDate;
    this.orderTotal= data.orderTotal;
    this.status= data.status;
    this.note= data.note;
    this.delivaryAddress = data.delivaryAddress;


  }


  getOrderTotal(){

    let OrderTotal = 0;

    this.stockDestailsList2.filteredData.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }

  getChargesTotal(){

    let chargesTotal = 0;

    this.additionalCharges2.forEach(
      (item)=>{
        chargesTotal = chargesTotal+item.amount;
      }
    );

    return chargesTotal;
  }

  getTotalDiscount(){

    let discountTotal = 0;

    this.deductions2.forEach(
      (item)=>{
        discountTotal = discountTotal+item.amount;
      }
    );

    return discountTotal;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_resources/product';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';
import { StockDetails } from 'src/app/_resources/stock-details';
import { OrderDetails } from 'src/app/_resources/order-details';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {

  stockDetailsList : StockDetails[] = [];

  stockDetailsList1 = new MatTableDataSource<StockDetails>()

  



  displayedColumns: string[] = [ 'name', 'amount', 'quantity' , 'total' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public productSlice  : StockDetails[] = [];
  lnght : number = 0;

  order : OrderDetails = {
    id : null,
    delivaryName : "",
    delivaryAddress : "",
    email :"",
    contactNo :"",
    note : "",
    orderDate :"",
    status : "",
    orderTotal :0,
    stock  :[],
    additionalCharges :[],
    deductions :[],
    messages : [],
    initialItemsTotal : null ,
    interimTotal : null ,
    chargesTotal : null,
    deductionTotal :null 
  }

  delivaryAddress : string ="";
  delivaryName : string='';
  contactNo : string = '';
  note : string = '';

  constructor(public apiCallService: ApiCallService) { }

  ngOnInit(): void {

    let resp = this.apiCallService.executeGet("/products/user-cart-stock-items");
    resp
    .subscribe(
      (response: any) => {
        console.log(response);


        //this.stockDetailsList = response;
       // this.productSlice = this.stockDetailsList.slice(0,8);
       //this.lnght = this.stockDetailsList.length;


        this.stockDetailsList1 = new MatTableDataSource(response);
        this.stockDetailsList1.paginator = this.paginator;

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }

  calculateRowTotal(quantity:number , price:number){
    return quantity*price;
  }

  getOrderTotal(){

    let OrderTotal = 0;

    this.stockDetailsList1.filteredData.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }

  placeOrder(){


    this.order.delivaryAddress =  this.delivaryAddress;
    this.order.delivaryName =  this.delivaryName;
    this.order.note =  this.note;
    this.order.contactNo =  this.contactNo;
    this.order.stock =  this.stockDetailsList1.filteredData;

    let resp=this.apiCallService.executePost("/products/place-order" , this.order);

    

    resp.subscribe(
      (response: any)=>{
        alert("order placed");
      },
      (error) => {
        alert("error occured");
        
      }       
    );


  }


  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.stockDetailsList.length){
      endIndex = this.stockDetailsList.length
    }
    this.productSlice =  this.stockDetailsList.slice(startIndex,endIndex)
  }

}

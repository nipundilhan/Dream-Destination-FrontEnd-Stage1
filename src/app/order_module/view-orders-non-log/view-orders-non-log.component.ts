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
  selector: 'app-view-orders-non-log',
  templateUrl: './view-orders-non-log.component.html',
  styleUrls: ['./view-orders-non-log.component.css']
})
export class ViewOrdersNonLogComponent implements OnInit {

  orderDetailsList : OrderDetails[] = [];
  public orderSlice  : OrderDetails[] = [];
  lnght : number = 0;

  email : String = "";

  order : OrderDetails ={
    id : null,
    delivaryName : "No Data To display",
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

  constructor(private userService: UserService ,   private router: Router) { }

  ngOnInit(): void {

    this.orderDetailsList.push(this.order);
  }

  reset(){




  }

  search(){
    let resp = this.userService.getNonLogUserOrders(this.email);
    resp.subscribe(
      (response: any)=>{
        this.orderDetailsList = response;
       this.orderSlice = this.orderDetailsList.slice(0,5);
       this.lnght = this.orderDetailsList.length;
        
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
    if(endIndex > this.orderDetailsList.length){
      endIndex = this.orderDetailsList.length
    }
    this.orderSlice =  this.orderDetailsList.slice(startIndex,endIndex)
  }


  editProduct(orderId : any ){
    this.router.navigate(['/order-actions-non-log',{orderId: orderId}]);
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

}

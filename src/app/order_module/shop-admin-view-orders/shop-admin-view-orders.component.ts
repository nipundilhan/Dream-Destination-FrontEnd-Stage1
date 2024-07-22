import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderDetails } from 'src/app/_resources/order-details';
import { OrderPagination } from 'src/app/_resources/order-pagination';
import { OrderSearch } from 'src/app/_resources/order-search';
import { ApiCallService } from 'src/app/_services/api-call.service';

@Component({
  selector: 'app-shop-admin-view-orders',
  templateUrl: './shop-admin-view-orders.component.html',
  styleUrls: ['./shop-admin-view-orders.component.css'],
  providers: [DatePipe]
})
export class ShopAdminViewOrdersComponent implements OnInit {

  //add the datePipe to providers array @compnent
  constructor(public datepipe: DatePipe , public apiCallService: ApiCallService ,private router: Router ) { }

  fromDate : any;
  toDate : any;
  maxDate = new Date(); 
  minDate = new Date(); 


  displayedColumns: string[] = ['id', 'orderName', 'email', 'contact' , 'date' , 'status' , 'actions'];
  orderDataSource : OrderPagination = new OrderPagination();




  ngOnInit(): void {

    this.ordrSrchRq.status = null;

    let resp=this.apiCallService.executePost("/order/search/0/5",this.ordrSrchRq);

    resp.subscribe(
      (response: any)=>{
        this.orderDataSource = response;
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );
  }

  ordrSrchRq:OrderSearch = new OrderSearch();

  onPaginateChange(event: PageEvent) {

    let page = event.pageIndex;
    let size = event.pageSize;

    let resp=this.apiCallService.executePost("/order/search/"+page+"/"+size,this.ordrSrchRq);
    //resp.subscribe((data)=>this.users=data);
    resp.subscribe((data)=>
    {
      this.orderDataSource = data;
    });
    

  

  }



  chngEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    
    if(event.value){
      this.minDate = event.value;
    }
  }

  public reset(){
    this.ordrSrchRq.email = null;
    this.ordrSrchRq.contactNo = null;
    this.ordrSrchRq.status = null;
    this.fromDate = null;
    this.toDate = null;

  }


  public search(){


    if (this.ordrSrchRq.email === "") {
      this.ordrSrchRq.email = null;
    }

    if (this.ordrSrchRq.contactNo === "") {
      this.ordrSrchRq.contactNo = null;
    }


      this.fromDate = this.datepipe.transform(this.fromDate, 'yyyy-MM-dd');
      this.ordrSrchRq.fromDate  = this.fromDate;

      this.toDate = this.datepipe.transform(this.toDate, 'yyyy-MM-dd');
      this.ordrSrchRq.toDate  = this.toDate;


    // let date = new Date('2022-09-21 01:00');
    // this.dateSelected4 = date;

    this.ordrSrchRq.toDate = this.toDate;
    
    let resp=this.apiCallService.executePost("/order/search/0/5",this.ordrSrchRq);

    resp.subscribe(
      (response: any)=>{
        this.orderDataSource = response;
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );



  }


  editOrder(od : any){
    this.router.navigate(['/shop-owner-edit-order',{orderId: od}]);
    
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

}

import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_resources/product';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';
import { StockDetails } from 'src/app/_resources/stock-details';
import { OrderDetails } from 'src/app/_resources/order-details';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProdIdReq } from 'src/app/_resources/prodIdReq';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { CommanActionNonLog } from 'src/app/_resources/comman-action-non-log';
import { OrderMessage } from 'src/app/_resources/order-message';
import { MatDialog } from '@angular/material/dialog';
import { Messagetype1DialogComponent } from 'src/app/global_comman1/messagetype1-dialog/messagetype1-dialog.component';
import { OrderDetailsCommanComponent } from '../order-details-comman/order-details-comman.component';
import { OrderSummeryCommanComponent } from '../order-summery-comman/order-summery-comman.component';
import { CommanCharge } from 'src/app/_resources/comman-charge';

@Component({
  selector: 'app-order-actions-non-logged',
  templateUrl: './order-actions-non-logged.component.html',
  styleUrls: ['./order-actions-non-logged.component.css']
})
export class OrderActionsNonLoggedComponent implements OnInit {

  stockDetailsList : StockDetails[] = [];

  stockDetailsList1 = new MatTableDataSource<StockDetails>();

  req : ProdIdReq=new ProdIdReq([]);

  orderId : any = 0;
  ordrDt : OrderDetails;
  
  @ViewChild('paginatorInterimOrderItems1') paginatorInterimOrderItems1: MatPaginator;  
  displayedColumnsInterim1: string[] = [ 'name', 'amount', 'quantity' ,'need' ,  'total' , 'actions'];
  interimStockDetailsList1 = new MatTableDataSource<StockDetails>();

  @ViewChild('paginatorInterimOrderItems2') paginatorInterimOrderItems2: MatPaginator;  
  displayedColumnsInterim2: string[] = [ 'name', 'amount', 'quantity' ,  'total' ];
  interimStockDetailsList2 = new MatTableDataSource<StockDetails>();

  interimStockDetails : StockDetails[] = [];


  @ViewChild('paginatorMessages') paginatorMessages: MatPaginator;  
  messages : OrderMessage[] = [];
  messageSlice  : OrderMessage[] = [];
  Msglnght : number = 0;


  displayedColumns: string[] = [ 'name', 'amount', 'quantity' , 'total' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public productSlice  : StockDetails[] = [];
  lnght : number = 0;



  @ViewChild(OrderDetailsCommanComponent, { static: true }) orderDetCommanComp: OrderDetailsCommanComponent  =  new OrderDetailsCommanComponent;
  @ViewChild(OrderSummeryCommanComponent, { static: true }) orderSumCommanComp: OrderSummeryCommanComponent  =  new OrderSummeryCommanComponent;


  
  unReadMessages : number = 0;
  cmnAction: CommanActionNonLog=new CommanActionNonLog("","","","", 0,0,0);
/*
  order : OrderDetails = {
    id : null,
    delivaryName : "",
    delivaryAddress : "",
    email : "",
    contactNo :"",
    note : "",
    orderDate :"",
    status : "",
    orderTotal :0,
    stock  :[],
    additionalCharges :[],
    deductions :[],
    messages :[],
  }
  */

  delivaryAddress : string ="";
  delivaryName : string='';
  contactNo : string = '';
  note : string = '';
  email : string = '';
  otp : string = '';
  message : string = '';

  constructor(private activatedRoute : ActivatedRoute ,private ngZone: NgZone , private changeDetectorRefs: ChangeDetectorRef ,private userAuthService: UserAuthService ,private userService: UserService ,public apiCallService: ApiCallService , public messageDialog: MatDialog) { }
  

  ngOnInit(): void {
    


    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');


    let resp = this.userService.getNonLogUserOrderDetails(this.orderId);
    resp
    .subscribe(
      (response: any) => {
        console.log(response);
        this.setRespone(response);

      },
      (error) => {
        this.showMessage("error occured. ");
        console.log(error);
      }
    );

  }


  setRespone(response: any){
       //this.order = response;
       this.ordrDt = response;


       this.orderDetCommanComp.loadData(this.ordrDt , this.ordrDt.stock);
       //this.changeDetectorRefs.detectChanges();

       this.orderSumCommanComp.loadData(this.ordrDt);
       this.changeDetectorRefs.detectChanges();

       this.email = response.email;

       this.cmnAction.email = this.email;
       this.cmnAction.orderId = this.orderId;
  
       this.messages = response.messages;
       this.Msglnght = this.messages.length;
       this.messageSlice = this.messages.slice(0,5);

       this.interimStockDetailsList1 = new MatTableDataSource(response.interimStock);
       this.interimStockDetailsList1.paginator = this.paginatorInterimOrderItems1;

       this.interimStockDetailsList2 = new MatTableDataSource(response.interimStock);
       this.interimStockDetailsList2.paginator = this.paginatorInterimOrderItems2;
  }



  calculateInterimRowTotal(quantity:number , price:number){
    return quantity*price;
  }

  getInterimOrderTotal(){

    let OrderTotal = 0;

    this.interimStockDetailsList1.filteredData.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }



  getChargesDiscountTotal(chrgs :CommanCharge[]){

    let chargesTotal = 0;

    chrgs.forEach(
      (item)=>{
        chargesTotal = chargesTotal+item.amount;
      }
    );

    return chargesTotal;

  }

  reject(id : any){

    if(this.cmnAction.otp.length < 4){
      //this.showMessage("enter valid otp ");
    }

    this.cmnAction.actionType = "Reject_Item";
    this.cmnAction.actionId = id;
    this.cmnAction.otp = this.otp;

    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        alert("Item removed successfully");

      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      } 
    );


    this.removeItems(id);
  }


  approve(id : any,item : StockDetails){


    if(this.cmnAction.otp.length < 4){
      //this.showMessage("enter valid otp ");
    }


    if(!item.needQuantity){
      alert("item quantity undefined");
    }else{
      alert(item.needQuantity);
    }


    

    

    this.cmnAction.actionType = "Aprove_Item";
    this.cmnAction.actionId = id;
    this.cmnAction.otp = this.otp;
    this.cmnAction.quantity = item.needQuantity;
    
    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        this.setRespone(response);
        alert('Item approved successfully');
      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      } 
    );


    this.removeItems(id);
    
  }

  removeItems(itemId : any){
    
    this.interimStockDetails = this.interimStockDetailsList1.filteredData;

 
    const index = this.interimStockDetails.findIndex(el => el.id === itemId);

    if (index > -1) {
      this.interimStockDetails.splice(index, 1);
    }

    this.interimStockDetailsList1 = new MatTableDataSource(this.interimStockDetails);
    this.interimStockDetailsList1.paginator = this.paginatorInterimOrderItems1;
  }

  refresh(){
    this.ngOnInit();
    this.message = '';
  }

  generateOTP(){
    let resp = this.userService.generateOtp(this.email);
    resp
    .subscribe(
      (response: any) => {
        alert('OTP generated Successfully');

      },
      (error) => {
        this.showMessage("error occured. ");
      }
    );
  }


  sendMessage(){

    this.cmnAction.actionType = "Snd_Msg_Cus";
    this.cmnAction.otp = this.otp;
    this.cmnAction.message = this.message;
 
    if(this.cmnAction.otp.length < 4){
      //this.showMessage("enter valid otp ");
    }

    if(this.cmnAction.message.length < 2){
      this.showMessage("minimum characters of message is 2 ");
      return;
    }

    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        alert('Message Sent Successfully');


        this.messages = response.messages;
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);
 
        // get messages from another API call and set the results to messages array didn't work
        // due to asynchronous call issue

        /*
        const msg : OrderMessage = {
          id : 0,
          email : this.email,
          message : this.message,
          readByCustomer : "YES",
          readByShop :  "NO",
          createdDate : "Today"
        }
    
        this.messages.unshift(msg);
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);
        */

      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      } 
    );


    this.message = '';



 
  }



  viewMessage(id:any){
    this.cmnAction.actionType = "Vw_Msg_Cus";
    this.cmnAction.actionId = id;

    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        this.messages = response.messages;
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);

        this.changeDetectorRefs.detectChanges();
        this.unReadMessages =  this.unReadMessages -1;
        this.changeDetectorRefs.detectChanges();

      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      } 
    );
    
    
    this.getOrderMessages();
  }


  

  getOrderMessages(){

    let resp = this.userService.getCommanOrderMessages(this.orderId);
    resp
    .subscribe(
      (response: any) => {
        console.log(response);

        this.messages = response;
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);

      },
      (error) => {
        this.showMessage("error occured. ");
        console.log(error);
      }
    );
  }

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.messages.length){
      endIndex = this.messages.length
    }
    this.messageSlice =  this.messages.slice(startIndex,endIndex)
  }

  getNonReadMessages(){

    let total = 0;

    this.messages.filter((value,key)=>{
      if(value.readByCustomer === 'NO' ){
        total = total+1;
      }
          
    });
    this.unReadMessages =  total;
    return total;
  }

  viewMessagePopup(msg:String){
    this.messageDialog.open(Messagetype1DialogComponent,
      {
        data:{
          message:msg
        
        },
        height: '175px',width: '400px'
      }
    );
  }


  showMessage(msg:any){

    this.messageDialog.open(Messagetype1DialogComponent,
      {
        data:{
          message:msg
        
        },
        height: '175px',width: '400px'
      }
    );
  }

  isThereSuggesstions(){
    if(this.interimStockDetailsList1._filterData.length > 0){
      
      return false;
    }
    return true;
  }

}

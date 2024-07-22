import { ApplicationRef, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { Product } from 'src/app/_resources/product';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductPagination } from 'src/app/_resources/product-pagination';
import { StockDetails } from 'src/app/_resources/stock-details';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { CommanCharge } from 'src/app/_resources/comman-charge';
import { OrderEdit } from 'src/app/_resources/order-edit';
import { ConfirmationPopupComponent } from 'src/app/global_comman1/confirmation-popup/confirmation-popup.component';
import { CommanDropDown } from 'src/app/_resources/comman-dropdown';
import { OrderDetails } from 'src/app/_resources/order-details';
import { OrderDetailsCommanComponent } from '../order-details-comman/order-details-comman.component';
import { StockDetailsError } from 'src/app/_resources/stock-details-error';
import { OrderSummeryCommanComponent } from '../order-summery-comman/order-summery-comman.component';
import { OrderMessage } from 'src/app/_resources/order-message';
import { CommanActionNonLog } from 'src/app/_resources/comman-action-non-log';
import { Messagetype1DialogComponent } from 'src/app/global_comman1/messagetype1-dialog/messagetype1-dialog.component';

@Component({
  selector: 'app-shop-admin-edit-order',
  templateUrl: './shop-admin-edit-order.component.html',
  styleUrls: ['./shop-admin-edit-order.component.css']
})
export class ShopAdminEditOrderComponent implements OnInit {

  
  masterTypeId:number = 0;
  masterTypes:CommanDropDown[]= [];

  productTypeId:number = 0;
  productTypes:CommanDropDown[]= [];

  brandId:number = 0;
  brands:CommanDropDown[]= [];

  orderStatus : any = "";
  showDiv : boolean = true;

  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;  


  @ViewChild('paginatorOrderItems') paginatorOrderItems: MatPaginator;  
  displayedColumns: string[] = [ 'name', 'amount', 'quantity' , 'status' ,  'total' ];
  stockDetailsList = new MatTableDataSource<StockDetails>();
  stockDetails : StockDetails[] = [];

  selectedRowId : any;

  @ViewChild('paginatorInterimOrderItems') paginatorInterimOrderItems: MatPaginator;  
  displayedColumnsInterim: string[] = [ 'name', 'amount', 'quantity' , 'status' ,  'total' , 'actions'];
  interimStockDetailsList = new MatTableDataSource<StockDetails>();
  interimStockDetails : StockDetails[] = [];

  @ViewChild('paginatorMessages') paginatorMessages: MatPaginator;  
  messages : OrderMessage[] = [];
  messageSlice  : OrderMessage[] = [];
  Msglnght : number = 0;

  unReadMessages : number = 0;
  cmnAction: CommanActionNonLog=new CommanActionNonLog("","","","", 0,0,0);

  email : string = '';
  message : string = '';


  deleteIterimItemId : any;
  deleteIterimItemProductId : any;

  productDataSource  : any;

  public productSlice  : Product[] = [];
  productDetails : Product[] = [];
  lnght : number = 0;

  orderId : any = 0;




  length : number = 0;


  additionalCharges : CommanCharge[] = [];
  deductions : CommanCharge[] = [];
  orderEdit : OrderEdit;

  ordrDt : OrderDetails;
  stockDetailsChild : StockDetailsError[] = [];

  @ViewChild(OrderDetailsCommanComponent, { static: true }) orderDetCommanComp: OrderDetailsCommanComponent  =  new OrderDetailsCommanComponent;
  @ViewChild(OrderSummeryCommanComponent, { static: true }) orderSumCommanComp: OrderSummeryCommanComponent  =  new OrderSummeryCommanComponent;




  constructor( private activatedRoute : ActivatedRoute ,private userAuthService: UserAuthService ,public dialog: MatDialog ,
    private changeDetectorRefs: ChangeDetectorRef ,private userService: UserService ,public apiCallService: ApiCallService , public messageDialog: MatDialog
    ,private router: Router ) { }

  ngOnInit(): void {


    this.initialSearchDropDownLoad();

    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');
    let resp = this.userService.getNonLogUserOrderDetails(this.orderId);
    resp
    .subscribe(
      (response: any) => {

        this.setResponse(response);


      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );

      
  }


  setResponse(response: any){

    console.log(response);
    this.ordrDt = response;

    // to get as new object, otherwise same response assign to both objects
    this.stockDetailsChild = JSON.parse(JSON.stringify(response.stock));
    
    // 1 - Object.assign(response.stock);  2-   [ ...response.stock ];
    // send data to the comman component
    

    this.orderSumCommanComp.loadData(this.ordrDt);
    this.changeDetectorRefs.detectChanges();

    this.messages = response.messages;
    this.Msglnght = this.messages.length;
    this.messageSlice = this.messages.slice(0,5);
    this.cmnAction.orderId = this.orderId

    this.changeDetectorRefs.detectChanges();
    this.orderStatus= this.ordrDt.status;

    this.stockDetailsList = new MatTableDataSource(response.stock);
    this.stockDetailsList.paginator = this.paginatorOrderItems;

    this.interimStockDetailsList = new MatTableDataSource(response.interimStock);
    this.interimStockDetailsList.paginator = this.paginatorInterimOrderItems;

    this.additionalCharges = response.additionalCharges;
    this.deductions = response.deductions;


     this.orderDetCommanComp.loadData(this.ordrDt , this.stockDetailsChild);
     this.changeDetectorRefs.detectChanges();
    

  }

  selectProduct(productId : any ){
    console.log("hit to the point");
    console.log(productId);
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }


  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }

    this.productSlice = this.productDetails.slice(startIndex,endIndex);


    
  }

  reset(){
    this.productDetails = [];
    this.lnght = 0;
    this.productSlice = this.productDetails.slice(0,0);
  }


  search(){

     alert ("at the moment search not working for the search criterias");
    let resp = this.apiCallService.executeGet("/product/all");


      
    resp
    // .pipe(
    //   map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    // )
    .subscribe(
      (response: any) => {
       //  this.productDataSource = new MatTableDataSource(response);
       //  this.productDataSource.paginator = this.paginator;


       this.productDetails = response;
       this.lnght = this.productDetails.length;
       this.productSlice = this.productDetails.slice(0,4);


      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }


  addItem(prd : Product){

    this.stockDetails = this.stockDetailsList.filteredData

    const prodId = prd.id !== null ? prd.id : 0;
    const index = this.stockDetails.findIndex(el => el.productId === prodId);
    if (index > -1) {
      alert("Item already added in order items");
      return;
    }

    this.interimStockDetails = this.interimStockDetailsList.filteredData


    const interimindex = this.interimStockDetails.findIndex(el => el.productId === prodId);
    if (interimindex > -1) {
      alert("Item already added in interim order items");
      return;
    }
    
    

    

     const  stock : StockDetails = {
      id : null,
      productId:prd.id!== null ? prd.id :0 ,
      productName : prd.productName,
      itemStatus : 'AVAILABLE',
      itemPrice : prd.productActualPrice !== null ? prd.productActualPrice :0,
      quantity :1,
      needQuantity:0,
      total : (prd.productActualPrice !== null ? prd.productActualPrice :0)*1
    }

    this.interimStockDetails.unshift(stock);

    this.interimStockDetailsList = new MatTableDataSource(this.interimStockDetails);
    this.interimStockDetailsList.paginator = this.paginatorInterimOrderItems;
    
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

  calculateRowTotal(quantity:number , price:number){
    return quantity*price;
  }

  getOrderTotal(){

    let OrderTotal = 0;

    this.stockDetailsList.filteredData.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }


  calculateInterimRowTotal(quantity:number , price:number){
    return quantity*price;
  }

  getInterimOrderTotal(){

    let OrderTotal = 0;

    this.interimStockDetailsList.filteredData.forEach(
      (item)=>{
        OrderTotal = OrderTotal+item.itemPrice * item.quantity;
      }
    );

    return OrderTotal;
  }

  getChargesTotal(){

    let chargesTotal = 0;

    this.additionalCharges.forEach(
      (item)=>{
        chargesTotal = chargesTotal+item.amount;
      }
    );

    return chargesTotal;
  }

  getTotalDiscount(){

    let discountTotal = 0;

    this.deductions.forEach(
      (item)=>{
        discountTotal = discountTotal+item.amount;
      }
    );

    return discountTotal;
  }

  getTotal(){

    return this.getOrderTotal() + this.getInterimOrderTotal() + this.getChargesTotal()-this.getTotalDiscount();

  }

  getStatus(){
    if(this.orderStatus == 'PENDING'){
      //this.changeDetectorRefs.detectChanges();
      return true;
    }else{
      //this.changeDetectorRefs.detectChanges();
      return false;
    }
  }


  removeNewItem(prodId : any){

    this.interimStockDetails = this.interimStockDetailsList.filteredData;

 
    const index = this.interimStockDetails.findIndex(el => el.id === prodId);

    if (index > -1) {
      this.interimStockDetails.splice(index, 1);
    }

    this.interimStockDetailsList = new MatTableDataSource(this.interimStockDetails);
    this.interimStockDetailsList.paginator = this.paginatorInterimOrderItems;
  }


  addCharge(){
    
    const  charge : CommanCharge = {
      id : null,
      name : null,
      description : null,
      amount :0
    };

    if(this.additionalCharges.length >= 4){
      alert("you can't add more than 4 charges");
      return;
    }

    this.additionalCharges.push(charge);

  }

  removeCharge(chrg:CommanCharge){

    const index = this.additionalCharges.indexOf(chrg, 0);
    if  (index > -1) {
      this.additionalCharges.splice(index, 1);
    }
  }


  addDiscount(){
    
    const  deduction : CommanCharge = {
      id : null,
      name : null,
      description : null,
      amount :0
    }

    this.deductions.push(deduction);

  }

  removeDiscount(dscnt:CommanCharge){

    const index = this.deductions.indexOf(dscnt, 0);
    if  (index > -1) {
      this.deductions.splice(index, 1);
    }
  }

  onStatusChange(val:any , prevVal : any){

    

      if(val === "NOT_AVAILABLE"){

        this.stockDetails = this.stockDetailsList.filteredData
        this.stockDetailsList.filteredData.filter((value,key)=>{
          if(value.id === this.selectedRowId ){

            if(confirm("Are you sure ? after this action you will loss the latest item quantity "+name)) {
              //value.name = row_obj.name;
              value.quantity = 0;
              return val;
            }else{
              //alert("value is "+ prevVal);
              this.changeDetectorRefs.detectChanges();  // <-- force change detection
              value.itemStatus="AVAILABLE";
              this.changeDetectorRefs.detectChanges(); // <-- prevent flicker
              return val;
            }

            


          }
          
        });

        this.changeDetectorRefs.detectChanges();

        //

      }else if(val === "AVAILABLE"){
        alert("please add the available quantity ");
      }

    
  }

  highlight(row :any){

    this.selectedRowId = row.id;

    if( row.itemStatus === "NOT_AVAILABLE"  ){
         
      row.quantity = 0;
          
    }

      



  

   

  }


  notify(){

    alert("customer will get a reminder notification about the pending messages and items");


  }

  cancel(){

    if(confirm("Are you sure ? you want to cancel the order. ")) {
    let resp = this.apiCallService.executeGet("/order/cancel/"+this.orderId);

    resp
    .subscribe(
      (response: any) => {
          alert("order canceled , please leave a message in message tab mentioning the reasons");
          this.router.navigate(['/test1',{id: this.orderId , type: "edit_order"}]);
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
    }


  }

  finalize(){

    if(this.interimStockDetailsList.filteredData.length > 0){
      alert("you have approval pending items attached to this order");
      return;
    }

    if(this.getNonReadMessages() > 0){
      alert("you have unread messages from customer");
      return;
    }

    if(confirm("Are you sure ? proceed only if you got the payment. ")) {

    
    
    let resp = this.apiCallService.executeGet("/order/approve/"+this.orderId);
      
    resp
    .subscribe(
      (response: any) => {
          //this.setResponse(response);
          this.ngOnInit();
          alert("order finalized successfully");
          this.router.navigate(['/test1',{id: this.orderId , type: "edit_order"}]);
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
    }


  }




  save(){
    const  oe : OrderEdit = {
      id : this.orderId ,
      stock: this.stockDetailsList.filteredData,
      interimStock: this.interimStockDetailsList.filteredData,
      charges: this.additionalCharges,
      deductions: this.deductions
    }


    let resp = this.apiCallService.executePost("/order/edit-order/"+this.orderId, oe);


      
    resp
    .subscribe(
      (response: any) => {

          this.setResponse(response);
          alert("order saved successfully");
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );

  }




  openDialog(element : any) {
    //alert("awa");

    this.deleteIterimItemId = element.id;
    this.deleteIterimItemProductId = element.productId;

    alert("item going to delete"+ this.deleteIterimItemId);

    const dialogRef = this.dialog.open(ConfirmationPopupComponent,
      {
        data:{
          message:"are you sure you want to delete?"
        
        },
        height: '200px',width: '500px'
      }
    );

    
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'yes'){
        let resp = this.apiCallService.executeGet("/order/delete-order-interim-item/"+this.deleteIterimItemId);
     
        resp
        .subscribe(
          (response: any) => {

            alert("item deleted successfully");
            this.removeNewItem( this.deleteIterimItemProductId);
    
          },
          (error) => {
            alert("error occured");
            console.log(error);
          }
        );
      }else if(result.event == 'no'){
        alert("no");
      }
    });
    
  }

  approve(id : any,item : StockDetails){



    this.cmnAction.actionType = "Aprove_Item";
    this.cmnAction.actionId = id;
    this.cmnAction.quantity = item.quantity;
    this.cmnAction.orderId = this.orderId;
    
    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        this.setResponse(response);
        alert('Item approved successfully');
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );

    this.removeNewItem( id);
    
  }


  public initialSearchDropDownLoad(){

    let resp=this.apiCallService.executeGet("/products/master-types/all");
    resp.subscribe(
      (response: any)=>{
        this.masterTypes=response
        console.log("first district name - "+this.masterTypes[0].name);
        
      },
      (error) => {
        alert("error occured");
        
      }       
    );

  }


  onMStProductTypeSelected(val:any){

    console.log("drop down value change method called");

    let resp=this.apiCallService.executeGet("/products/master-type/"+val+"/types");

    resp.subscribe(
      (response: any)=>{
        this.productTypes=response
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );
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
        alert("error occured");
      }
    );
  }


  sendMessage(){

    this.cmnAction.actionType = "Snd_Msg_Shp";
    this.cmnAction.actionId = this.orderId;
    this.cmnAction.message = this.message;
// order id has set on setResponse Method

    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        alert('Message Sent Successfully');


        this.messages = response.messages;
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);


      },
      (error) => {
        alert("error occured");
      }
    );


    this.message = '';



 
  }



  viewMessage(id:any){
    this.cmnAction.actionType = "Vw_Msg_Shp";
    this.cmnAction.actionId = id;
// order id has set on setResponse Method

    let resp = this.userService.CommanOrderActions(this.cmnAction);
    resp
    .subscribe(
      (response: any) => {
        this.unReadMessages = this.unReadMessages-1;

        this.messages = response.messages;
        this.Msglnght = this.messages.length;
        this.messageSlice = this.messages.slice(0,5);

      },
      (error) => {
        alert("error occured");
      }
    );
    
    this.sendAction(this.cmnAction , "Message Sent Successfully");

    this.getOrderMessages();
  }


  sendAction(cmnAction: CommanActionNonLog , msg: String){


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
        alert("error occured");
        console.log(error);
      }
    );
  }

  onPageChange1(event: PageEvent){
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
      if(value.readByShop === 'NO' ){
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
        height: '200px',width: '500px'
      }
    );
  }


}

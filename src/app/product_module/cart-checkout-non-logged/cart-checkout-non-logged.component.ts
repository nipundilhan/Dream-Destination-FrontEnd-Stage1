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
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProdIdReq } from 'src/app/_resources/prodIdReq';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Messagetype1DialogComponent } from 'src/app/global_comman1/messagetype1-dialog/messagetype1-dialog.component';
import { ConfirmationPopupComponent } from 'src/app/global_comman1/confirmation-popup/confirmation-popup.component';

const phoneEmailRegex = /^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/;

@Component({
  selector: 'app-cart-checkout-non-logged',
  templateUrl: './cart-checkout-non-logged.component.html',
  styleUrls: ['./cart-checkout-non-logged.component.css']
})
export class CartCheckoutNonLoggedComponent implements OnInit {
  stockDetailsList : StockDetails[] = [];

  stockDetailsList1 = new MatTableDataSource<StockDetails>();

  req : ProdIdReq=new ProdIdReq([]);


  form = new FormGroup({

    "delivaryName": new FormControl("", Validators.required),
    "delivaryAddress": new FormControl("", [Validators.required,Validators.minLength(10)]),
    "email": new FormControl("", [Validators.required ,Validators.email]),
    "contactNo": new FormControl("", [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    "note": new FormControl("", ),

  });



  displayedColumns: string[] = [ 'name', 'amount', 'quantity' , 'total' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public productSlice  : StockDetails[] = [];
  lnght : number = 0;

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
  email : string = '';

  findStock :StockDetails;

  constructor( private userAuthService: UserAuthService ,private userService: UserService ,public dialog: MatDialog ,public apiCallService: ApiCallService , public messageDialog: MatDialog
    ,private router: Router
  ) { 


  }

  ngOnInit(): void {

    this.req.productIds = this.userAuthService.getNonLogCartItems();
    let resp = this.userService.getNonLogUserCartItemsForCheckout(this.userAuthService.getNonLogCartItems());
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
    this.order.email =  this.email;
    this.order.stock =  this.stockDetailsList1.filteredData;

    this.stockDetailsList = this.stockDetailsList1.filteredData;

 
    const index = this.stockDetailsList.findIndex(el => el.quantity === 0 || el.quantity > 10 );
    const find =this.stockDetailsList.find(el => el.quantity === 0 || el.quantity > 10);
    if (index > -1) {
      this.showMessage("Invalid quantity in item - " + find?.productName + ". you can order maximum 10 from each item");
      return
    }

    const dialogRef = this.dialog.open(ConfirmationPopupComponent,
      {
        data:{
          message:"Are you sure you want to proceed?"
        
        },
        height: '150px',width: '400px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'yes'){

    let resp = this.userService.getNonLogUserPlaceOrder(this.order);
    resp.subscribe(
      (response: any)=>{
        alert("order placed, track your order using actions tab.");
        this.userAuthService.setNonLogCartItems([]);
        this.router.navigate(['/view-products-non-log']);
      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      }       
    );

  }else if(result.event == 'no'){
    //alert("no");
  }
  });



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

}

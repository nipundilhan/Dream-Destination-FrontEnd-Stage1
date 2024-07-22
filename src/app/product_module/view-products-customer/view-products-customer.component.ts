import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { CommanDropDown } from 'src/app/_resources/comman-dropdown';
import { Product } from 'src/app/_resources/product';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProductSearch } from 'src/app/_resources/product-search';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Messagetype1DialogComponent } from 'src/app/global_comman1/messagetype1-dialog/messagetype1-dialog.component';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';

export interface User {
  name: string;
}


@Component({
  selector: 'app-view-products-customer',
  templateUrl: './view-products-customer.component.html',
  styleUrls: ['./view-products-customer.component.css']
})
export class ViewProductsCustomerComponent implements OnInit {

  searchClicked: boolean = false;
  productTypeId:number = 0;

  productTypes:CommanDropDown[]= [];

  brandId:number = 0;
  brands:CommanDropDown[]= [];

  searchText:any = null;

  searchReq:ProductSearch = new ProductSearch(0,0,0,0,null);

  nonLogcartItems : number[] = [];


  lnght : number = 0;

  public productSlice  : Product[] = [];

  productDetails : Product[] = [];

  startPage : number = 0;
  initialPageSize : number = 24;
  pageSize : number =24;

  onPageChange(event: PageEvent){

    console.log(event);
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }

    if(this.searchClicked){
      this.searchAPIcall(this.searchReq ,event.pageIndex,event.pageSize);
    }else{
      this.brandId = 0;
      this.productTypeId = 0;
      this.searchText = null;
      this.searchAPIcall(new ProductSearch(0,0,0,0,null) ,event.pageIndex,event.pageSize);
    }
 
  }




  constructor(public imagesDialog: MatDialog ,public apiCallService: ApiCallService,public userService: UserService,  private userAuthService: UserAuthService ,
    public imageprocessService :ImageprocessService ,     private router: Router  , public messageDialog: MatDialog ) { }

  ngOnInit(): void {


    this.loadDropDowns();
    this.getAllProducts();


    // initiated this.userAuthService.setNonLogCartItems([0]) at app.component.ts ngonit()
    /*if(this.userAuthService.getNonLogCartItems() === null){
      this.userAuthService.setNonLogCartItems([0]);
    } */
    
  }



  onSearchTextChange(value: any) {
    // This method will be called whenever the input value changes
    console.log('Search text changed:', this.searchText);
    //alert(this.searchText);
    this.brandId = 0;
    this.productTypeId = 0;

    // You can perform further actions here, like filtering a list or making API calls
    // Example: this.filterProducts(this.searchText);
  }

  public loadDropDowns(){

    let resp=this.userService.getAllProductTypes();

    resp.subscribe(
      (response: any)=>{
        this.productTypes=response
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );

    let resp1=this.userService.getAllBrands();

    resp1.subscribe(
      (response: any)=>{
        this.brands=response
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );

  }

  public getAllProducts(){
  
    this.searchAPIcall(this.searchReq ,this.startPage,this.initialPageSize);
  }

  checkOut(){

    this.router.navigate(['/cart-checkout']);
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }


  dropDownValueChange(val:any){
    this.searchText = null;
    //this.productTypeId = val;

    //this.searchReq.productTypeId = this.productTypeId;
    console.log("drop down value change method called - "+val);

  }

  
  brandropDownValueChange(val:any){
    this.searchText = null;
    //this.brandId = val;
    //this.searchReq.brandId  = this.brandId;
    console.log("drop down value change method called - "+val);

  }

  reset(){

    this.brandId = 0;
    this.productTypeId = 0;
    this.searchText = null;

    this.searchClicked = false;
    this.router.navigate(['/test1',{id: this.brandId , type: "view_products_reset"}]);
    //this.searchAPIcall(this.searchReq ,this.startPage,this.pageSize);


  }


  search(){
    this.searchClicked = true;
    this.searchAPIcall(this.searchReq ,this.startPage,this.pageSize);

  }

  searchAPIcall(searchReq:ProductSearch , page : any , size : any){

    this.searchReq.brandId  = this.brandId;
    this.searchReq.productTypeId = this.productTypeId;
    this.searchReq.searchText = this.searchText;

    let resp1=this.userService.basicProductSearch(searchReq ,page,size);

    resp1
    .subscribe(
      (response: any)=>{
        
        this.productDetails = response.items.map((product : Product) => this.imageprocessService.processProductImages(product));
        this.lnght = response.meta.totalItems;
        this.productSlice = this.productDetails.slice(0,size);
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }       
    );
  }

  addToCart(productId : any){

    if(this.userAuthService.getNonLogCartItems().length >50){
      
      this.showMessage("you cannot add more than 50 items ");
      return;
    }

    if(this.userAuthService.getNonLogCartItems().includes(productId)){
      //alert("items alread added");
      this.showMessage("Item have been already added. ");

      return;

    }else{
      /*
      if(this.userAuthService.getNonLogCartItems()[0] === 0){
        this.nonLogcartItems = this.userAuthService.getNonLogCartItems();
        this.nonLogcartItems.pop();
        this.nonLogcartItems.push(productId);
      }else{
        this.nonLogcartItems = this.userAuthService.getNonLogCartItems();
        this.nonLogcartItems.push(productId);
      }*/

      this.nonLogcartItems = this.userAuthService.getNonLogCartItems();
      this.nonLogcartItems.push(productId);
    }



    this.userAuthService.setNonLogCartItems(this.nonLogcartItems);

    alert("added to cart successfully");
  }

  showImages(product : Product ){
    console.log("hit to the point");
      console.log(product);
  
      this.imagesDialog.open(ShowProductImagesDialogComponent,
        {
          data:{
            images:product.productImages,
            description:product.description
          },
          height: '450px',width: '350px'
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


}

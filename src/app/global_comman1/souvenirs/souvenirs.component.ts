import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { Product } from 'src/app/_resources/product';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Messagetype1DialogComponent } from '../messagetype1-dialog/messagetype1-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-souvenirs',
  templateUrl: './souvenirs.component.html',
  styleUrls: ['./souvenirs.component.css']
})
export class SouvenirsComponent implements OnInit {

  lnght : number = 8;

  public productSlice  : Product[] = [];

  productDetails : Product[] = [];

  nonLogcartItems : number[] = [];
  product : Product ;

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }
    this.productSlice =  this.productDetails.slice(startIndex,endIndex)
  }




  constructor(public apiCallService: ApiCallService,public userService: UserService, private userAuthService: UserAuthService ,
    public imageprocessService :ImageprocessService , public messageDialog: MatDialog  ) { 

    }

  ngOnInit(): void {
    this.getAllProducts();



    if(this.userAuthService.getNonLogCartItems() === null){
      this.userAuthService.setNonLogCartItems([0]);
    }
      


    
    
  }

  public getAllProducts(){
    let resp = this.userService.getProducts();

    resp
    .pipe(
      map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response;
        this.lnght = this.productDetails.length;
        this.productSlice = this.productDetails.slice(0,2);

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }




  addToCart(productId : any){

    if(this.userAuthService.getNonLogCartItems().includes(productId)){
      //alert("alredy includes in cart");

      this.messageDialog.open(Messagetype1DialogComponent,
        {
          data:{
            message:"item have been already added"
          
          },
          height: '200px',width: '500px'
        }
      );

      return;

    }else{
      if(this.userAuthService.getNonLogCartItems()[0] === 0){
        this.nonLogcartItems = this.userAuthService.getNonLogCartItems();
        this.nonLogcartItems.pop();
        this.nonLogcartItems.push(productId);
      }else{
        this.nonLogcartItems = this.userAuthService.getNonLogCartItems();
        this.nonLogcartItems.push(productId);
      }
    }



    this.userAuthService.setNonLogCartItems(this.nonLogcartItems);

    alert("added to cart successfully");
  }

}

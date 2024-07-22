import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/_resources/product';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  lnght : number = 8;

  public productSlice  : Product[] = [];

  productDetails : Product[] = [];

  onPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex*event.pageSize;
    let endIndex = startIndex+event.pageSize;
    if(endIndex > this.productDetails.length){
      endIndex = this.productDetails.length
    }
    this.productSlice =  this.productDetails.slice(startIndex,endIndex)
  }




  constructor(public apiCallService: ApiCallService,public userService: UserService, 
    public imageprocessService :ImageprocessService ,     private router: Router ) { }

  ngOnInit(): void {
    this.getAllProducts();
    
  }

  public getAllProducts(){
    let resp = this.apiCallService.executeGet("/products/user-cart-items");

    resp
    .pipe(
      map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
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

  checkOut(){

    this.router.navigate(['/cart-checkout']);
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }
}

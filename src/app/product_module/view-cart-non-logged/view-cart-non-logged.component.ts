import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ProdIdReq } from 'src/app/_resources/prodIdReq';
import { Product } from 'src/app/_resources/product';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-view-cart-non-logged',
  templateUrl: './view-cart-non-logged.component.html',
  styleUrls: ['./view-cart-non-logged.component.css']
})
export class ViewCartNonLoggedComponent implements OnInit {

  lnght: number = 0;

  public productSlice: Product[] = [];

  productDetails: Product[] = [];

  req: ProdIdReq = new ProdIdReq([]);

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.productDetails.length) {
      endIndex = this.productDetails.length
    }
    this.productSlice = this.productDetails.slice(startIndex, endIndex)
  }




  constructor(public apiCallService: ApiCallService, public userService: UserService, private userAuthService: UserAuthService,
    public imageprocessService: ImageprocessService, private router: Router) { }

  ngOnInit(): void {

    this.loadItems();


  }


  loadItems() {
    this.req.productIds = this.userAuthService.getNonLogCartItems();
    if (this.req.productIds.length > 0) {
      let resp = this.userService.getNonLogUserCartItems(this.userAuthService.getNonLogCartItems());

      resp
        .pipe(
          map((x: Product[], i) => x.map((product: Product) => this.imageprocessService.processProductImages(product)))
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            this.productDetails = response;
            this.lnght = this.productDetails.length;
            this.productSlice = this.productDetails.slice(0, 4);

          },
          (error) => {
            alert("error occured");
            console.log(error);
          }
        );
    }
  }

  remove(product: Product) {

    const data = this.userAuthService.getNonLogCartItems();
    const index = data.findIndex(el => el === product.id);
    if (index > -1) {
      data.splice(index, 1);
    }
    this.userAuthService.setNonLogCartItems(data);
    alert("item removed successfully");

    if(data.length < 1){
      this.router.navigate(['/view-products-non-log']);

    }

    this.loadItems();
    // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }


  checkOut() {

    this.router.navigate(['/cart-checkout-non-logged']);
    // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

  public showNextButton() {

    if (this.userAuthService.getNonLogCartItems() === null) {
      return false;
    } else {
      if (this.userAuthService.getNonLogCartItems()[0] === 0) {
        return false;
      }
    }
    return true;
  }
}

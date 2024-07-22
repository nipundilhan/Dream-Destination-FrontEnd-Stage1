import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Tour } from 'src/app/_resources/tour';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { Observable, map, startWith } from 'rxjs';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Product } from 'src/app/_resources/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  lnght : number = 8;

  public productSlice  : Tour[] = [];
  productDetails : Tour[] = [];

  public souvenirsSlice  : Product[] = [];
  souvenirsDetails : Product[] = [];

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
    private userAuthService: UserAuthService ,    private router: Router ,
    public imageprocessService :ImageprocessService  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllSouvenirs();
  }

  public getAllProducts(){
    let resp = this.userService.getTours();
    console.log("tour packages API eka call wena thanata awa");
    resp
    .pipe(
      map((x : Tour[] ,  i) => x.map((product : Tour) => this.imageprocessService.processPackageImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.productDetails = response;
        this.productSlice = this.productDetails.slice(0,4);

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }

  public getAllSouvenirs(){
    let resp = this.userService.getProducts();

    resp
    .pipe(
      map((x : Product[] ,  i) => x.map((product : Product) => this.imageprocessService.processProductImages(product)))
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        this.souvenirsDetails = response;
        this.lnght = this.souvenirsDetails.length;
        this.souvenirsSlice = this.souvenirsDetails.slice(0,4);

      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  }

  gotoDestinations(){
    this.router.navigate(['/tour-packages']);
  }

  seeProducts(){
    this.router.navigate(['/view-products-non-log']);
  }


  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }


}

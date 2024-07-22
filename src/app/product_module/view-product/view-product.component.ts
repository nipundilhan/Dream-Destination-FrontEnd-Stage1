import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { ProductUpload } from 'src/app/_resources/product-upload';
import { DataServiceService } from 'src/app/_secondary_services/data-service.service';
import { ApiCallService } from 'src/app/_services/api-call.service';
import { ImageprocessService } from 'src/app/_services/imageprocess.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

 // tsconfing.json --->  "compilerOptions": {"   strictPropertyInitialization":false }
 // that's why we don't need to provide actual object  to the object reference
  product : ProductUpload ;
  time : any ;
  productId !: any;
  
  constructor(private router: Router , private dataSrvc: DataServiceService ,private activatedRoute : ActivatedRoute ,public imageprocessService :ImageprocessService , public userService: UserService, public apiCallService: ApiCallService ) { }

  ngOnInit(): void {
    

  

    this.productId =this.activatedRoute.snapshot.paramMap.get('id');

    if(this.productId){
      let resp = this.apiCallService.executeGet("/products/"+this.productId);
      resp
      .pipe(map( p => this.imageprocessService.processProductImages(p)))
      .subscribe(
        (response: any) => { // ProductUpload -> any
          console.log("point ekata awa");
          this.product = response;
          console.log("product details 2 - " + this.product.productName);
        },
        (error) => {
          alert("error occured");
          console.log(error);
        }
      );
    }else{
      this.dataSrvc.data$.subscribe(data => {
        this.product = data;
      });
    }




    



    

   
    


  }


  addToCart(){
    let resp = this.apiCallService.executeGet("/products/add-cart/"+this.productId);
    resp
    .subscribe(
      (response: any) => { // ProductUpload -> any
        console.log("point ekata awa");
        alert("add to the cart")
      },
      (error) => {
        alert("error occured");
        console.log(error);
      }
    );
  // check ProductResolverService and app-routing.module.ts  , path: 'create-product'

  }

}

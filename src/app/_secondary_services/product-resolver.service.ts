import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_resources/product';
import { Observable, map, of } from 'rxjs';
import { ImageprocessService } from '../_services/imageprocess.service';
import { ApiCallService } from '../_services/api-call.service';
import { ProductUpload } from '../_resources/product-upload';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductUpload>{

  public prdct : ProductUpload;

  constructor(    public imageprocessService :ImageprocessService , public userService: UserService, public apiCallService: ApiCallService) { }

  resolve(route: ActivatedRouteSnapshot, state : RouterStateSnapshot):Observable<ProductUpload> {

    
   const id = route.paramMap.get("productId");
   if(id){
    
    let resp = this.apiCallService.executeGet("/products/"+id);
    resp
    .pipe(map( p => this.imageprocessService.processProductImages(p)))
    .subscribe(
      (response: any) => { 
        this.prdct = response;
      },
      (error) => {
        alert("error occured");
      }
    );
    return of(this.prdct);
    
    
   }else{

    return of(this.prdct);
   }
  }

  getProductDetails(){
    return{
      id : null,
      code:null,
      productName : null,
      description:"",
      productActualPrice : null,
      brandId : null ,
      productTypeId : null,
      productImages : []
    };
  }


}


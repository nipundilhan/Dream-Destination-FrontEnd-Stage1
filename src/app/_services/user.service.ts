import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = 'http://localhost:9090';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(    private httpclient: HttpClient,    private userAuthService: UserAuthService) { }



  public login(loginData : any) {

    console.log("login method called"); 
    return this.httpclient.post(this.PATH_OF_API + '/jwt/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public getTours() {

    console.log("login method called"); 
    return this.httpclient.get<any>(this.PATH_OF_API + '/tour/all', {
      headers: this.requestHeader,
    });
  }

  public getProducts() {

    console.log("login method called"); 
    return this.httpclient.get<any>(this.PATH_OF_API + '/product/all', {
      headers: this.requestHeader,
    });
  }

  public getNonLogUserCartItems(cartIds : any) {

    console.log("login method called"); 
    return this.httpclient.post<any>(this.PATH_OF_API + '/product/get-products', cartIds , {
      headers: this.requestHeader,
    });
  }

  

  public getNonLogUserCartItemsForCheckout(cartIds : any) {

    console.log("login method called"); 
    return this.httpclient.post<any>(this.PATH_OF_API + '/product/non-log-user-cart-items', cartIds , {
      headers: this.requestHeader,
    });
  }


  public getNonLogUserPlaceOrder(OrderReq : any) {

    return this.httpclient.post<any>(this.PATH_OF_API + '/product/place-order-non-logged-user', OrderReq , {
      headers: this.requestHeader,
    });
  }

  public getNonLogUserOrders(email : any) {
    return this.httpclient.get(this.PATH_OF_API + '/product/get-order-list/'+email,  {
      headers: this.requestHeader,
    });
  }

  public getNonLogUserOrderDetails(orderId : any) {
    return this.httpclient.get(this.PATH_OF_API + '/product/get-order-details/'+orderId,  {
      headers: this.requestHeader,
    });
  }

  public CommanOrderActions(commanActionRequest : any) {
    return this.httpclient.post<any>(this.PATH_OF_API + '/product/comman-order-actions/', commanActionRequest, {
      headers: this.requestHeader,
    });
  }

  public getCommanOrderMessages(orderId : any) {
    return this.httpclient.get<any>(this.PATH_OF_API + '/product/get-order-messages/'+orderId ,  {
      headers: this.requestHeader,
    });
  }

  public generateOtp(email : any) {
    return this.httpclient.get<any>(this.PATH_OF_API + '/product/generate-otp/'+email ,  {
      headers: this.requestHeader,
    });
  }


  public getAllProductTypes() {

    console.log("login method called"); 
    return this.httpclient.get<any>(this.PATH_OF_API + '/product/types/all',  {
      headers: this.requestHeader,
    });
  }

  public getAllBrands() {

    console.log("login method called"); 
    return this.httpclient.get<any>(this.PATH_OF_API + '/product/brands',  {
      headers: this.requestHeader,
    });
  }

  public basicProductSearch(searchReq : any , page : any , size : any) {

    console.log("login method called"); 
    return this.httpclient.post<any>(this.PATH_OF_API + '/product/basic-search-products/'+page+'/'+size, searchReq , {
      headers: this.requestHeader,
    });
  }


  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        //console.log("user Role - "+ i+ " + "+userRoles[i].roleName );
        for (let j = 0; j < allowedRoles.length; j++) {
          //console.log("Allowed Role - "+ allowedRoles.length+ " + "+ allowedRoles[j]);
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
  }

  public permissionMatch(allowedPermissions:[]): boolean {
    let isMatch = false;
    const userPermissions: [] = this.userAuthService.getPermissionCodes();

    for (let j = 0; j < allowedPermissions.length; j++) {
      if ( userPermissions.includes(allowedPermissions[j]) ) {
        
        return true;
      }
    }  
    console.log( " false ");
    return isMatch;
  }
}

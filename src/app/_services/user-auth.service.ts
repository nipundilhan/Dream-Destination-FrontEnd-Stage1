import { Injectable } from '@angular/core';
import { Product } from '../_resources/product';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  nonLogcartItems : Product[] = [];

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles')! );
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken')! ;
  }

  public setPermissionCodes(prmsnCds: []) {
    localStorage.setItem('permissionCodes', JSON.stringify(prmsnCds));
  }

  public getPermissionCodes(): [] {
    return JSON.parse(localStorage.getItem('permissionCodes')! );
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public setUserName(userName: string) {
    localStorage.setItem('userName', userName);
  }

  public getUserName(): string {
    return localStorage.getItem('userName')! ;
  }

  public setCollapse(collapse: string) {
    localStorage.setItem('collapse', collapse);
  }

  public getCollapse(): string {
    return localStorage.getItem('collapse')! ;
  }

  
  public collapse() {
    if (localStorage.getItem('collapse')! === "true") {   
      this.setCollapse("false");
    }else{
      this.setCollapse("true");
    }
  }




  public setNonLogCartItems(itemList: number[]) {
    localStorage.setItem('nonLoggedCartItems', JSON.stringify(itemList));
  }

  public getNonLogCartItems(): number[] {
    return JSON.parse(localStorage.getItem('nonLoggedCartItems')! );
  }

  public setToHome(toHome: string) {
    localStorage.setItem('toHome', toHome);
  }

  public getToHome(): string {
    return localStorage.getItem('toHome')! ;
  }
 
}

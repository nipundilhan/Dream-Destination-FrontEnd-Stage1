import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      const prmsns = route.data['prmsns'] as [];

      console.log(role);
      console.log(prmsns);
      if (prmsns) {
        //alert("one");
        if (role) {
          const rolematch = this.userService.roleMatch(role);
          const permissionmatch = this.userService.permissionMatch(prmsns);

          if (rolematch && permissionmatch) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        } 

      }else{
        if (role) {
          const match = this.userService.roleMatch(role);
  
          if (match) {
            return true;
          } else {
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
      }

      /*if (role) {
        const match = this.userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }*/
    }

    this.router.navigate(['/login']);
    return false;
  }



  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
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

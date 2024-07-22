import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(    public userService: UserService ,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

    //due to userAuthService is private you cannot access it from html directly
    public isLoggedIn() {
      return this.userAuthService.isLoggedIn();
    }
  
  
    
    public permissionMatch(allowedPermissions:any): boolean {
  
      return this.userService.permissionMatch(allowedPermissions);
  
    }

}

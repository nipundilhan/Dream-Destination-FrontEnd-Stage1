import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usrNm : any;

  constructor(    private userAuthService: UserAuthService ,
    private router: Router,
    public userService: UserService) { }

  ngOnInit(): void {

    this.usrNm = this.userAuthService.getUserName();
  }


  public getUserName() {
    this.usrNm = this.userAuthService.getUserName();

    for (let i = 0; i < 12-this.usrNm.length; i++) {
      this.usrNm = this.usrNm + ".";
    }
    return this.usrNm;
  }

  public logout() {
    //this.usrNm = "";
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }


  public collapse() {
    this.userAuthService.collapse();
  }
  public isCollapse() {
    if (this.userAuthService.getCollapse() === "true") {   
        return true;
    }else{
      return false;
    }
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }


}

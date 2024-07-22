import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-settings-manual',
  templateUrl: './settings-manual.component.html',
  styleUrls: ['./settings-manual.component.css']
})
export class SettingsManualComponent implements OnInit {

  usrNm : any;
  roles : any;

  constructor( private userAuthService: UserAuthService ,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    
    this.userAuthService.clear();
    this.router.navigate(['/home']);

  }


  public getUserName() {
    this.usrNm = this.userAuthService.getUserName();

    return this.usrNm;
  }

  public getRoles() {

    const userRoles: any = this.userAuthService.getRoles();
    this.roles = userRoles[0].roleName;

    return this.roles;
  }

}

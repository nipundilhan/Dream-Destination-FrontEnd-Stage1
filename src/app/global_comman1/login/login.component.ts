import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Messagetype1DialogComponent } from '../messagetype1-dialog/messagetype1-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(    private userService: UserService,
    private userAuthService: UserAuthService ,  public messageDialog: MatDialog ,
        private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm : NgForm) {
    console.log("form is submitted"); 
    console.log(loginForm.value);

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
 
        //console.log(response.jwtToken);
        //console.log(response.user.role);
        //console.log(response.user.permissions);



        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setPermissionCodes(response.user.permissions);
        this.userAuthService.setUserName(response.user.username);
        
        const role = response.user.role[0].roleName;
        console.log(response.user.role[0].roleName);

        if (role === 'ADMIN') {
          this.router.navigate(['/tours']);
        } else {
          this.router.navigate(['/view-products-non-log']);
        } 


      },
      (httpError: any) => {
        console.log(httpError);
        this.showMessage(httpError.error.message);
        
      }   
    );
    }



    showMessage(msg:any){

      this.messageDialog.open(Messagetype1DialogComponent,
        {
          data:{
            message:msg
          
          },
          height: '175px',width: '400px'
        }
      );
    }
}

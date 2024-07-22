import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from './_services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drm_dstnts';


  constructor(
    private router: Router, private activatedRoute : ActivatedRoute ,
    private userAuthService: UserAuthService 
  ) {
        
        if(userAuthService.getToHome() !== "false"){

          this.router.navigate(['/home']);

        }
        userAuthService.setToHome("true")
        
        userAuthService.setNonLogCartItems([]);

   }

   public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public isCollapse() {
    if (this.userAuthService.getCollapse() === "true") {   
        return true;
    }else{
      return false;
    }
  }


}

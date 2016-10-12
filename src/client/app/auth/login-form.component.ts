import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Credentials } from './credentials';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id, // this is needed to correctly resolve paths to templateUrl and Css
  templateUrl: 'login-form.html',
  selector: 'login-form'
})
export class LoginFormComponent {

  user: Credentials = new Credentials('','');
  errorMsg: string;

  constructor(private auth: AuthService, private router: Router) {

  }

  login(): void {
      this.auth.login(this.user).then( res => {
        if(res) {
          this.errorMsg = undefined;
          this.router.navigate(['/']);
        } else {
          this.errorMsg = 'Authentication failed';
        }
      }).catch(err => {
        this.errorMsg = err;
      });
  }
}

import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../auth/auth.service';
// import { Subscription }   from 'rxjs/Subscription';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent {

  // authenticated: boolean = false;
  // subscription: Subscription;
  // username: string;

  // constructor(private router: Router) {

  // }

  // ngOnInit() {
  //   this.auth.isAuthenticated().then(authenticated => {
  //     this.authenticated = authenticated;
  //     this.username = (authenticated) ? this.auth.username() : '';
  //   });
  //   this.subscription = this.auth.authenticationChanges()
  //     .subscribe((val: boolean) => {
  //       if (this.authenticated && !val) {
  //         // authentication status changes from logged in to logged out
  //         // so we navigate to the home page
  //         this.router.navigate(['/']);
  //       }
  //       this.username = (val) ? this.auth.username() : '';
  //       this.authenticated = val;
  //     });
  // }

  // logout() {
  //   this.auth.logout();
  // }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}

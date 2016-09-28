import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription }   from 'rxjs/Subscription';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent implements OnInit {

  authenticated: boolean = false;
  subscription: Subscription;

  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.auth.isAuthenticated().then(authenticated => {
      this.authenticated = authenticated;
    });
    this.subscription = this.auth.authenticationChanges()
      .subscribe((val:boolean) => {
        if(this.authenticated && !val) {
          // authentication status changes from logged in to logged out
          // so we navigate to the home page
          this.router.navigate(['/']);
        }
        this.authenticated = val});
  }

  logout() {
    this.auth.logout();
  }

  /* TODO consider if this is needed
  http://stackoverflow.com/questions/34926628/angular2-unsubsribe-from-event-in-ngondestroy
  ngOnDestroy() {
    unsubscribe the authenticationChanges here
  }
  */
}

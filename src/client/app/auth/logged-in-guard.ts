// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.auth.isLoggedIn().then(loggedIn => {
      if(!loggedIn){
        this.router.navigate(['login']);
      }
      return loggedIn;
    }).catch(err => {
      this.router.navigate(['login']);
    });
  }
}

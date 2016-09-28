import { Injectable, EventEmitter } from '@angular/core';
import { Credentials } from './credentials';
import { BackendService } from '../shared/backend-service/backend-service';

@Injectable()
export class AuthService {

  constructor(private bs: BackendService) { }

  fire: EventEmitter<boolean> = new EventEmitter();

  change() {
    console.log('change started');
    this.fire.emit(true);
  }

  private initialized: boolean = false;
  private authenticated: boolean = false;

  isAuthenticated(): Promise<boolean> {
    if (!this.initialized) {
      return this.getUser();
    }
    return Promise.resolve(this.authenticated);
  }

  authenticationChanges() {
    return this.fire;
  }

  logout(): Promise<boolean> {
    return this.bs.post('logout', '').then(res => { return this.getUser(); })
      .catch(err => {
        console.error('AuthService.logout: ' + err);
        this.getUser();
      });
  }

  login(cred: Credentials): Promise<boolean> {
    let headers = {
      authorization: "Basic " + btoa(cred.username + ":"
        + cred.password)
    };
    return this.getUser(headers);
  }

  private getUser(headers?: any): Promise<boolean> {
    return this.bs.get('user', headers).then(response => {
      let newAuthenticatedVal = (response.json().name) ? true : false;
      if (this.authenticated != newAuthenticatedVal) {
        // authenticated state is changed => update the value and fire notification
        this.setAuthenticated(newAuthenticatedVal);
      }
      return this.authenticated;
    }).catch(err => {
      this.setAuthenticated(false);
      console.error('AuthService.getUser: ' + err);
    });
  }

  private setAuthenticated(val: boolean): void {
    this.authenticated = val;
    this.fire.emit(this.authenticated);
    if (!this.initialized) {
      this.initialized = true;
    }
  }
}

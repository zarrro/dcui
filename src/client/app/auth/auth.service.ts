import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { BackendService } from '../shared/backend-service/backend-service';

@Injectable()
export class AuthService {

  constructor(private bs: BackendService) {

  }

  private authenticated: boolean = false;;

  logout(): Promise<any> {
    return this.bs.post('logout', '');
  }

  login(cred: Credentials): Promise<boolean> {
    let headers = {
      authorization: "Basic " + btoa(cred.username + ":"
        + cred.password)
    };
    return this.getUser(headers);
  }

  isLoggedIn(): Promise<boolean> {
    if (this.authenticated) {
      return Promise.resolve(true);
    } else {
      return this.getUser();
    }
  }

  private getUser(headers?: any): Promise<boolean> {
    return this.bs.get('user', headers).then(response => {
      this.authenticated = (response.json().name) ? true : false;
      return this.authenticated;
    });
  }
}

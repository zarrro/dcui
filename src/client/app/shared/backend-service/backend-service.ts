import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Config } from '../index';

import 'rxjs/add/operator/toPromise';

/**
Helper class. Wraps the angular http client. Adds common logic specific to the
DC backend communication - like host name,  headers, etc. Also, converts the API
to promises based.
*/

@Injectable()
export class BackendService {

  private static defaultRO = BackendService.getDefaultRO();
  private backendURL: string;

  private static getCustomRO(headers: any): RequestOptions {
    let ret = BackendService.getDefaultRO();
    for (let h in headers) {
      ret.headers.append(h, headers[h]);
    }
    return ret;
  }

  private static getDefaultRO(): RequestOptions {
    let ro = new RequestOptions();
    ro.headers = new Headers();
    ro.headers.set('X-Requested-With', 'XMLHttpRequest');
    ro.withCredentials = true;
    return ro;
  }

  constructor(private http: Http) {
    this.backendURL = Config.API;
    console.log(Config);
  }

  get(path: string, headers?: any): Promise<any> {
    let ro = (headers) ? BackendService.getCustomRO(headers) :
      BackendService.defaultRO;
    return this.http.get(this.backendURL + '/' + path, ro).toPromise();
  }

  post(path: string, body: any, headers?: any): Promise<any> {
    let ro = (headers) ? BackendService.getCustomRO(headers) :
      BackendService.defaultRO;
    ro.method = 'POST';
    console.log(ro);
    console.log('post body ' + body);
    return this.http.post(this.backendURL + '/' + path, body, ro).toPromise();
  }


}

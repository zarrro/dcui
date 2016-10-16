import { Injectable } from '@angular/core';
import { BackendService } from '../shared/backend-service/backend-service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AnamnesisService {

  constructor(private bs: BackendService) {

  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Promise<string[]> {
    return this.bs.get('anamnesisTemplates/58028b6c5604e31d24faff21').then(this.extractData).catch(this.handleError);
  }

  private extractData(res: any): string[] {
    let data = res.json();
    return data.entries || {};
  }

  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
}

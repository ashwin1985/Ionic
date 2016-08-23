import {Jsonp, Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {AuthService} from './authservice';

export class UserService {

  authService;

  constructor (private http:Http) {
    this.authService = new AuthService(http);
  }

  getAllUsers() {
    let options = this.authService.getDeafultOptions;
    return this.http.get(this.authService.getBaseUrl() + "users", options)
    .map(res => res.json())
  }
}

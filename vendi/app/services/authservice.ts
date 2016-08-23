import {Jsonp, Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

const AUTHENTICATION_STORAGE_KEY = 'AUTHENTICATION';
// const BASE_URL = "http://107.170.86.37:5050/";
const BASE_URL = "http://localhost:5050/";

export class AuthService {

  constructor (private http:Http) {}

  signup(user) {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});
    return this.http.post(BASE_URL + "signup", body, options);
  }

  login(username, password) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Basic ' +
      btoa(username + ':'+ password));
    let options = new RequestOptions({ headers: headers});
    return this.http.post(BASE_URL + "login","", options)
    .map(res => res.json());
  }

  logout() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer '
    + localStorage.getItem(AUTHENTICATION_STORAGE_KEY));
    let options = new RequestOptions({ headers: headers});
    return this.http.post(BASE_URL + "logout","", options);
  }

  saveToken(token) {
    localStorage.setItem(AUTHENTICATION_STORAGE_KEY, "" + token);
  }

  removeToken() {
    localStorage.removeItem(AUTHENTICATION_STORAGE_KEY);
  }

  getDeafultOptions() {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer '
    + localStorage.getItem(AUTHENTICATION_STORAGE_KEY));
    let options = new RequestOptions({ headers: headers});
    return options;
  }

  getBaseUrl() {
    return BASE_URL;
  }

}

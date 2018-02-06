import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import {Observable, Subject } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { observeOn } from 'rxjs/operators/observeOn';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

@Injectable()
export class AuthService {

  token: IToken;

  constructor(private http: Http) { }

  login(loginCredentials: ILoginCredentials) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('https://localhost:44344/api/auth/token', JSON.stringify(loginCredentials), options)
      .map((response: Response) => {
        this.token = <IToken>response.json();
        localStorage.setItem('token', JSON.stringify(this.token));
        return Observable.of(true);
      }).catch(error => {
        return Observable.of(false);
      });
  }

  isAuthenticated() {
    this.token = this.token || JSON.parse(localStorage.getItem('token'));
    let hasToken = !!this.token;
    if (!hasToken) {
      return false;
    }
    let tokenValid = !!(this.token.token);
    if ( !tokenValid) {
      return false;
    }
    let expired = this.token.expiration <= new Date();
    if ( expired ) {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.clear();
    this.token = null;
  }
}

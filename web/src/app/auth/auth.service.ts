import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { User } from '../users/user';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'KFsjWJFXw8iuATzg3WiyuVVohDRCgUug',
    domain: 'feeldaburn.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost/api',
    redirectUri: 'http://localhost/callback',      
    scope: 'openid profile email read:messages'
  });

  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  public readonly user: Observable<User> = this._user.asObservable();

  private apiUrl: string = `${environment.apiUrl}/users`;

  constructor(public router: Router,
              private authHttp: AuthHttp) {}

  public login(): void {
    this.auth0.authorize();
  }

   public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getUserAndCreateUserIfNotExists(authResult.idTokenPayload);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
      else if(this.isAuthenticated() && localStorage.getItem('profile')){
        this.getUserAndCreateUserIfNotExists(JSON.parse(localStorage.getItem('profile')));
      }
    });
  }
  

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
     this._user.next(null);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  private getUserAndCreateUserIfNotExists(idTokenPayload) {

    var userData = {
      name: idTokenPayload.name,
      email: idTokenPayload.email,
      picture: idTokenPayload.picture,
      sub: idTokenPayload.sub
    };

    this.authHttp.post(this.apiUrl, userData)
      .map(res => res.json())
      .subscribe(userData => {
        this._user.next(new User(userData));
      });
  }
}
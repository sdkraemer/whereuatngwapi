import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/Rx";
import * as auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-config";
import { UserProfile } from "app/core/models/userprofile";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IUser, User } from "app/core/models/user";

// import { Router } from "@angular/router";
// import { Observable } from "rxjs/Observable";
// import "rxjs/add/operator/filter";
// import { AuthHttp } from "angular2-jwt";

@Injectable()
export class AuthService {
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: "token id_token",
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: UserProfile;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  user: IUser;
  user$ = new BehaviorSubject<IUser>(this.user);

  private usersApiUrl: string = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
    // If authenticated, set local profile property and update login status subject
    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem("profile"));
      this.setLoggedIn(true);
      this.createUser(this.userProfile);
    }
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = "";
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
      this.createUser(profile);
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("expires_at", JSON.stringify(expTime));
    this.userProfile = profile;
    this.setLoggedIn(true);
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("expires_at");
    this.userProfile = undefined;
    this.setLoggedIn(false);
    this.setUser(null);
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return Date.now() < expiresAt;
  }

  private createUser(profile: UserProfile) {
    var userData = {
      name: profile.name,
      email: profile.email,
      picture: profile.picture,
      sub: profile.sub
    };

    this.http
      .post(this.usersApiUrl, profile, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .subscribe((userData: IUser) => {
        this.setUser(new User(userData));
      });
  }

  private setUser(user: IUser) {
    this.user$.next(user);
    this.user = user;
  }
}

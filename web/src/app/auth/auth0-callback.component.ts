import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "./auth.service";

@Component({
  selector: "auth0-callback",
  templateUrl: "auth0-callback.component.html"
})
export class Auth0CallbackComponent implements OnInit {
  loggedInSub: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    auth.handleAuth();
  }

  ngOnInit() {
    this.loggedInSub = this.auth.loggedIn$.subscribe(
      loggedIn => (loggedIn ? this.router.navigate(["/"]) : null)
    );
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
  }
}

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './users/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: User;

  constructor(public auth: AuthService) {
    auth.handleAuthentication();
    this.auth.user.subscribe((user) => {
      this.user = user;
    });
  }

}

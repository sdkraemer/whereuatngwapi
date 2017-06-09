import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService,
              private userService: UserService) { }

  ngOnInit() {
  }

  callApi() {
    if(this.auth.isAuthenticated()){
      this.userService.api()
        .subscribe(() => {
          console.log("Did something happen?");
        });
    }
  }

}
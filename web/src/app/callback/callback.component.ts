import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  constructor(public auth: AuthService,
              ) { }

  ngOnInit() {
  }

}
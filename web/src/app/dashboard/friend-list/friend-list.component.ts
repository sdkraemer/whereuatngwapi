import { Component, OnInit } from "@angular/core";
import { FriendService } from "../../friend/friend.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "friend-list",
  templateUrl: "./friend-list.component.html",
  styleUrls: ["./friend-list.component.css"]
})
export class FriendListComponent implements OnInit {
  private friends$;
  constructor(
    private friendService: FriendService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.friends$ = this.friendService.getFriends();
  }
}

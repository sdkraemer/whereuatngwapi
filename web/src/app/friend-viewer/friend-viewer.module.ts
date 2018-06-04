import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FriendViewerComponent } from "./friend-viewer.component";
import { FriendViewerRoutingModule } from "./friend-viewer.routing";
import { SharedModule } from "../shared/shared.module";
import { TweetMomentComponent } from './tweet-moment/tweet-moment.component';

@NgModule({
  imports: [CommonModule, SharedModule, FriendViewerRoutingModule],
  declarations: [FriendViewerComponent, TweetMomentComponent]
})
export class FriendViewerModule {}

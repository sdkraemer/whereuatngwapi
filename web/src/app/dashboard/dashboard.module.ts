import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashboardComponent } from "./dashboard.component";
import { FriendListComponent } from "./friend-list/friend-list.component";
import { SharedModule } from "app/shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule],
  declarations: [DashboardComponent, FriendListComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { FriendViewerComponent } from "./friend-viewer.component";

const routes: Routes = [
  {
    path: "friend-viewer/:id",
    component: FriendViewerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendViewerRoutingModule {}

export const routedComponents = [FriendViewerComponent];

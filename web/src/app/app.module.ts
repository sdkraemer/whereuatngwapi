import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "hammerjs";

import { SharedModule } from "./shared/shared.module";
import { LocationsModule } from "./locations/locations.module";
import { DashboardModule } from "./dashboard/dashboard.module";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";

import { AppRoutingModule, appRoutingProviders } from "./app-routing.module";

import { UserService } from "./users/user.service";

import { AuthService } from "./auth/auth.service";
import { Auth0CallbackComponent } from "./auth/auth0-callback.component";
import { FriendService } from "./friend/friend.service";
import { FriendViewerModule } from "./friend-viewer/friend-viewer.module";
import { TwitterModule } from "./twitter/twitter.module";

@NgModule({
  declarations: [AppComponent, HomeComponent, Auth0CallbackComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    LocationsModule,
    TwitterModule,
    DashboardModule,
    FriendViewerModule,
    AppRoutingModule //This needs to be after all other feature modules.
  ],
  providers: [AuthService, UserService, FriendService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}

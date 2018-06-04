import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { Auth0CallbackComponent } from "app/auth/auth0-callback.component";
import { AuthGuard } from "app/auth/auth.guard";
import { ModuleWithProviders } from "@angular/core";

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  //{ path: 'profile', component: ProfileComponent },
  { path: "auth0callback", component: Auth0CallbackComponent },
  { path: "**", redirectTo: "" }
];

export const appRoutingProviders: any[] = [AuthGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);

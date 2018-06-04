import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ILocation } from "../core/models/location";

@Injectable()
export class LocationsService {
  constructor(private httpClient: HttpClient) {}

  getLocations(userId) {
    return this.httpClient
      .get(`${environment.apiUrl}/locations/${userId}`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .map((response: ILocation[]) => {
        console.dir(response);
        return response;
      })
      .catch(this.handleError);
  }

  handleError(error: any) {
    console.error("server error:", error);
    return Observable.throw(error || " default error handlererererer");
  }
}

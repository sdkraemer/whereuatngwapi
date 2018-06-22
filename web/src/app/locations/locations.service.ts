import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ILocation } from "../core/models/location";

@Injectable()
export class LocationsService {
  constructor(private httpClient: HttpClient) {}

  getMoments(userId) {
    let params = new HttpParams();
    params = params.append("count", "100");
    params = params.append("moments", "true");

    return this.getLocations(userId, params);
  }

  getLocations(userId, params: HttpParams = null) {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("access_token")}`
    );

    if (!params) {
      var params = new HttpParams();
      params = params.append("count", "100");
    }

    return this.httpClient
      .get(`${environment.apiUrl}/locations/${userId}`, { headers, params })
      .map((response: ILocation[]) => {
        return response;
      })
      .catch(this.handleError);
  }

  getRecentLocations(userId) {
    let params = new HttpParams();
    params = params.append("count", "50");

    return this.getLocations(userId, params);
  }

  handleError(error: any) {
    console.error("server error:", error);
    return Observable.throw(error || " default error handlererererer");
  }
}

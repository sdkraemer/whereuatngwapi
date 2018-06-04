import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { environment } from "environments/environment";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { IFriend, Friend } from "../core/models/friend";
import { IUser } from "../core/models/user";

@Injectable()
export class FriendService {
  apiUrl: string = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {}

  getFriend(userId) {
    return this.httpClient
      .get(`${this.apiUrl}/ninjas/${userId}`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map((response: IUser) => {
          let friend = new Friend({
            id: response.id,
            name: response.name,
            email: response.email
          });
          return friend;
        }),
        catchError(this.handleError("getFriends", []))
      );
  }

  getFriends(): Observable<IFriend[]> {
    return this.httpClient
      .get(`${this.apiUrl}/ninjas`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map((response: IFriend[]) => {
          console.dir(response);
          return response;
        }),
        catchError(this.handleError("getFriends", []))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

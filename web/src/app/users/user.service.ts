import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../environments/environment";

//rxjs
import { Observable } from "rxjs/Observable";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class UserService {
  apiUrl: string = `${environment.apiUrl}`;
  constructor(public http: HttpClient) {}

  api() {
    console.log(this.apiUrl);
    return this.http
      .get(`${this.apiUrl}/authhttp`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map(response => {
          console.dir(response);
        }),
        catchError(this.handleError("api", []))
      );

    //   .map(response => {
    //     console.log("hello?");
    //     console.dir(response);
    //   })
    //   .catch(this.handleError);
  }

  getUser() {}

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

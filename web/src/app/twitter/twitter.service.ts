import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { environment } from "environments/environment";

@Injectable()
export class TwitterService {
  constructor(private httpClient: HttpClient) {}

  getEmbeddedTweet(tweetUrl) {
    return this.httpClient
      .get(`${environment.apiUrl}/twitter?url=${tweetUrl}`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map(data => {
          return data["html"];
        }),
        catchError(this.handleError("getEmbeddedTweet", []))
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

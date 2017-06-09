import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    apiUrl: string = `${environment.apiUrl}`;
    constructor(
        public http: Http,
        public authHttp: AuthHttp
    ) { }

    api() {
        console.log(this.apiUrl);
        return this.authHttp.get(`${this.apiUrl}/authhttp`)
            .map((response: Response) => {
                console.log("hello?");
                console.dir(response);
            })
            .catch(this.handleError);
    }

    handleError(error: any){
        console.error('server error:', error);
        return Observable.throw(error || ' default error handlererererer');
    }
}
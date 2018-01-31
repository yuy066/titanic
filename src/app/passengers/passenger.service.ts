import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { RequestOptions, Http } from '@angular/http';

import { Passenger, Note } from '../../api/src/controllers/passengers';

@Injectable()
export class PassengerService {

    constructor(private _http: HttpClient) { }

    getPassengers(): Observable<Passenger[]> {
        return this._http.get<Passenger[]>('/passenger')
            .catch(this.handleError);
    }

    getPassengerNote(id: number): Observable<Note[]>{
        return this._http.get<Note[]>("/passenger/" + id + "/note")
                .do(data => console.log('Note: '+ JSON.stringify(data.length)))
                .catch(this.handleError);
    }

    addNote(message :any, id:number): void{
        this._http.post("/passenger/" + id + "/note", JSON.stringify(message))
        .subscribe(data => console.log(data));
    }

    deleteNote(id: number): void{
        this._http.delete("/note/" + id, {responseType: 'json'})
        .subscribe(data => console.log(data));
    }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}

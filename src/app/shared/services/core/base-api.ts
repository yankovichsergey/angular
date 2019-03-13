import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class BaseApi {
    public baseUrl = 'http://localhost:3000/';

    // public baseUrl = 'https://kurs-690e7.firebaseio.com/';

    constructor(
        public http: HttpClient,
    ) {
    }

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    private getHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
            'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization'
        });
    }

    public get(url: string = ''): Observable<any> {
        return this.http.get(this.getUrl(url), {
            headers: this.getHeaders()
        })
            .pipe(map((response) => response));
    }

    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data, {
            headers: this.getHeaders()
        });
    }

    public put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data, {
            headers: this.getHeaders()
        });
    }


}

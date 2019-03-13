import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserModel} from '../models/user.model';
import {BaseApi} from './core/base-api';

@Injectable()
export class UserService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    // getUserByEmail(email: string): Observable<UserModel> {
    //     return this.http.get(`${this.baseUrl}users?email=${email}`)
    //         .pipe(map((user: UserModel[]) => user[0] ? user[0] : undefined));
    // }
    //
    // createNewUser(user): Observable<UserModel> {
    //     return this.http.post<UserModel>(this.baseUrl + 'users', user);
    // }

    getUserByEmail(email: string): Observable<UserModel> {
        return this.get(`users?email=${email}`)
            .pipe(map((user: UserModel[]) => user[0] ? user[0] : undefined));
    }

    createNewUser(user): Observable<UserModel> {
        return this.post('users', user);
    }
}

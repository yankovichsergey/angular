import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BillModel} from '../models/bill.model';
import {BaseApi} from '../../../shared/services/core/base-api';


@Injectable()
export class BillService extends BaseApi {

    constructor(
        public http: HttpClient,
    ) {
        super(http);
    }

    // getBill(): Observable<BillModel> {
    //     return this.http.get<BillModel>(this.baseUrl + 'bill')
    //         .pipe(map((data) => data));
    // }

    getCurrency(): Observable<any> {
        return this.http.get(`https://www.cbr-xml-daily.ru/daily_json.js`)
            .pipe(map((data) => data));
    }

    getBill(): Observable<BillModel> {
        return this.get('bill');
    }

    updateBill(bill: BillModel): Observable<BillModel> {
        return this.put('bill', bill);
    }


}

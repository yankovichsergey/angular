import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {BillModel} from '../shared/models/bill.model';
import {delay} from 'rxjs/operators';

@Component({
    selector: 'app-bill-page',
    templateUrl: './bill-page.component.html',
    styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
    public sub1: Subscription;
    public sub2: Subscription;
    public currency: any;
    public bill: BillModel;
    public isLoaded = false;

    constructor(
        private billService: BillService
    ) {
    }

    ngOnInit() {
        this.sub1 = combineLatest(
            this.billService.getBill(),
            this.billService.getCurrency(),
        ).subscribe((data: [BillModel, any]) => {
            this.bill = data[0];
            this.currency = data[1];
            this.isLoaded = true;
        });
    }

    onRefresh() {
        this.isLoaded = false;
        this.sub2 = this.billService.getCurrency()
            .pipe(delay(2000))
            .subscribe((currency: any) => {
                this.currency = currency;
                this.isLoaded = true;
            });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}

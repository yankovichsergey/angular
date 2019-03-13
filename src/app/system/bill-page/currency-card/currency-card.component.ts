import {Component, Input, OnInit} from '@angular/core';

import {BillModel} from '../../shared/models/bill.model';

@Component({
    selector: 'app-currency-card',
    templateUrl: './currency-card.component.html',
    styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
    @Input() bill: BillModel;
    @Input() currency: any;
    currencies: string[] = ['USD', 'EUR'];

    constructor() {
    }

    ngOnInit() {
    }

}

import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill.model';

@Component({
    selector: 'app-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

    @Input() bill: BillModel;
    @Input() currency: any;

    dollar: number;
    euro: number;

    constructor() {
    }

    ngOnInit() {
        this.dollar = this.bill.value / this.currency.Valute.USD.Value;
        this.euro = this.bill.value / this.currency['Valute']['EUR']['Value'];
    }

}

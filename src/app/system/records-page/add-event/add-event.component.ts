import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';
import {EventService} from '../../shared/services/event.service';
import {BillService} from '../../shared/services/bill.service';
import {BillModel} from '../../shared/models/bill.model';
import {MessageModel} from '../../../shared/models/message.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animations';


@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
    animations: [fadeStateTrigger]
})
export class AddEventComponent implements OnInit, OnDestroy {
    @Input() categories: CategoryModel[] = [];

    public types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'}
    ];

    public message: MessageModel;

    public sub1: Subscription;
    public sub2: Subscription;

    constructor(private eventService: EventService,
                private billService: BillService
    ) {
    }

    ngOnInit() {
        this.message = new MessageModel('', '');
    }

    private showMessage(text: string, type: string) {
        this.message.text = text;
        this.message.type = type;
        window.setTimeout(() => this.message.text = '', 5000);
    }

    onSubmit(form: NgForm) {
        let {type, amount, category, description} = form.value;
        if (amount < 0) {
            amount *= -1;
        }
        const event = new EventModel(type, amount, +category, description, moment().format('DD.MM.YYYY HH:mm:ss'));
        this.sub1 = this.billService.getBill()
            .subscribe((bill: BillModel) => {
                let value = 0;
                if (type === 'outcome') {
                    if (amount > bill.value) {
                        this.showMessage(`На счету недостаточно средств. Вам не хватает ${amount - bill.value}`, 'danger');
                        return;
                    } else {
                        value = bill.value - amount;
                    }
                } else {
                    value = bill.value = amount;
                }
                this.sub2 = this.billService.updateBill({value, currency: bill.currency})
                    .pipe(mergeMap(() => {
                        return this.eventService.addEvent(event);
                    }))
                    .subscribe(() => {
                        this.showMessage(`Запись добавлена.`, `success`);
                        form.setValue({
                            amount: 0,
                            description: ' ',
                            category: 1,
                            type: 'outcome'
                        });
                    });
            });
    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}

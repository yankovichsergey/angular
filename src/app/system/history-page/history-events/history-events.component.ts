import {Component, Input, OnInit} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';

@Component({
    selector: 'app-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

    @Input() category: CategoryModel[] = [];
    @Input() event: EventModel[] = [];

    public searchValue = '';
    public searchPlaceholder = 'Сумма';
    public searchField = 'amount';

    constructor() {
    }

    ngOnInit() {
        this.event.forEach((e) => {
            e.catName = this.category.find(c => c.id === e.category).name;
        });
    }

    getEventClass(e: EventModel) {
        return {
            'label': true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income'
        };
    }

    changeCriteria(field: string) {
        const nameMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип',
        };
        this.searchPlaceholder = nameMap[field];
        this.searchField = field;
    }

}

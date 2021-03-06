import {Component, EventEmitter, Input, Output} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';

@Component({
    selector: 'app-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

    @Output() onFilterCancel = new EventEmitter<any>();
    @Output() onFilterApply = new EventEmitter<any>();
    @Input() categoties: CategoryModel[] = [];

    public timePeriods = [
        {type: 'd', label: 'День'},
        {type: 'w', label: 'Неделя'},
        {type: 'M', label: 'Месяц'},
    ];
    public selectedPeriod = 'd';
    public types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'},
    ];
    public selectedTypes = [];
    public selectedCategories = [];

    closeFiler() {
        this.onFilterCancel.emit();
        this.selectedTypes = [];
        this.selectedCategories = [];
        this.selectedPeriod = 'd';
    }

    private calculateInputParams(field: string, checked: boolean, value: string): any {
        if (checked) {
            this[field].indexOf(value) === -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(i => i !== value);
        }
    }

    handleChangeType({checked, value}) {
        this.calculateInputParams('selectedTypes', checked, value);
    }

    handleChangeCategory({checked, value}) {
        this.calculateInputParams('selectedCategories', checked, value);
    }

    applyFilter() {
        this.onFilterApply.emit({
            types: this.selectedTypes,
            categories: this.selectedCategories,
            period: this.selectedPeriod,
        });
    }

}

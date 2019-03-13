import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';


@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    public category: CategoryModel[] = [];
    public event: EventModel[] = [];
    public filterEvent: EventModel[] = [];
    public isLoaded = false;
    public chartsData = [];
    public sub1: Subscription;
    private isFilterVisible = false;

    constructor(
        private categoryService: CategoryService,
        private eventService: EventService
    ) {
    }

    ngOnInit() {
        this.sub1 = combineLatest(
            this.categoryService.getCategoryes(),
            this.eventService.getEvents()
        ).subscribe((data: [CategoryModel[], EventModel[]]) => {
            this.category = data[0];
            this.event = data[1];
            this.calculateChartData();
            this.setOriginalEvents();
            this.onFilterCancel();
            this.isLoaded = true;
        });
    }

    private toggleFilter(dir: boolean) {
        this.isFilterVisible = dir;
    }

    private setOriginalEvents() {
        this.filterEvent = this.event.slice();
    }

    calculateChartData() {
        this.chartsData = [];
        this.category.forEach((cat) => {
            const catEvent = this.filterEvent.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartsData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    openFilter() {
        this.toggleFilter(true);
    }

    onFilterCancel() {
        this.toggleFilter(false);
        this.setOriginalEvents();
        this.calculateChartData();
    }

    onFilterApply(data) {
        this.toggleFilter(false);
        this.setOriginalEvents();

        const startPeriod = moment().startOf(data.period).startOf('d');
        const endPeriod = moment().endOf(data.period).endOf('d');

        this.filterEvent = this.filterEvent
            .filter((e) => {
                return data.types.indexOf(e.type) !== -1;
            })
            .filter((e) => {
                return data.categories.indexOf(e.category.toString()) !== -1;
            })
            .filter((e) => {
                const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
                return momentDate.isBetween(startPeriod, endPeriod);
            });
        this.calculateChartData();

    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}

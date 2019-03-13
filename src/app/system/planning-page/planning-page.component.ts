import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {EventModel} from '../shared/models/event.model';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';

@Component({
    selector: 'app-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

    public isLoaded = false;
    public bill: BillModel;
    public categories: CategoryModel[] = [];
    public events: EventModel[] = [];
    public sub1: Subscription;

    constructor(
        private billService: BillService,
        private categoryService: CategoryService,
        private eventServise: EventService
    ) {
    }

    ngOnInit() {
        this.sub1 = combineLatest(
            this.billService.getBill(),
            this.categoryService.getCategoryes(),
            this.eventServise.getEvents(),
        ).subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
            this.bill = data[0];
            this.categories = data[1];
            this.events = data[2];

            this.isLoaded = true;
        });
    }

    getCategoryCost(cat: CategoryModel): number {
        const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
        return catEvents.reduce((total, e) => {
            total += e.amount;
            return total;
        }, 0);
    }

    private getPercent(cat: CategoryModel): number {
        const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
        return percent > 100 ? 100 : percent;
    }

    private getCatPercent(cat: CategoryModel): string {
        return this.getPercent(cat) + '%';
    }

    getCalorClass(cat: CategoryModel): string {
        const percent = this.getPercent(cat);
        return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }


}

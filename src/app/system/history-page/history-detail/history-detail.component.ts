import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {EventService} from '../../shared/services/event.service';
import {CategoryService} from '../../shared/services/category.service';
import {EventModel} from '../../shared/models/event.model';
import {CategoryModel} from '../../shared/models/category.model';


@Component({
    selector: 'app-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    public event: EventModel;
    public category: CategoryModel;
    public isLoaded = false;
    public sub1: Subscription;

    constructor(
        private route: ActivatedRoute,
        private eventService: EventService,
        private categoryServise: CategoryService
    ) {
    }

    ngOnInit() {
        this.sub1 = this.route.params
            .pipe(
                mergeMap((params: Params) => {
                    return this.eventService.getEventById(params['id']);
                })
            )
            .pipe(mergeMap((ev: EventModel) => {
                this.event = ev;
                console.log(ev.category);
                return this.categoryServise.getCategoryById(ev.category);
            }))
            .subscribe((cat: CategoryModel) => {
                this.category = cat;
                this.isLoaded = true;
            });

    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }


}

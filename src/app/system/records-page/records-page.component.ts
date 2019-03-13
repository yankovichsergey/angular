import {Component, OnInit} from '@angular/core';

import {CategoryModel} from '../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
    selector: 'app-records-page',
    templateUrl: './records-page.component.html',
    styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

    public categories: CategoryModel[] = [];
    public isLoaded = false;

    constructor(
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.categoryService.getCategoryes()
            .subscribe((categories: CategoryModel[]) => {
                this.categories = categories;
                this.isLoaded = true;
            });
    }

    newCategoryAdd(category: CategoryModel) {
        this.categories.push(category);
    }

    editCategory(category: CategoryModel) {
        const idx = this.categories.findIndex(c => c.id === +category.id);
        this.categories[idx] = category;
    }
}

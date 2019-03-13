import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CategoryService} from '../../shared/services/category.service';
import {CategoryModel} from '../../shared/models/category.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

    @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

    public sub1: Subscription;

    constructor(
        private  categoryServise: CategoryService
    ) {
    }

    onSubmit(form: NgForm) {
        let {categoryName, categoryValue} = form.value;
        if (categoryValue < 0) {
            categoryValue *= -1;
        }
        const category = new CategoryModel(categoryName, categoryValue);
        this.sub1 = this.categoryServise.addCategory(category)
            .subscribe((cat: CategoryModel) => {
                form.reset();
                form.form.patchValue({capacity: 1});
                this.onCategoryAdd.emit(cat);
            });
    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}

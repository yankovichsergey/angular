import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoryModel} from '../../shared/models/category.model';
import {CategoryService} from '../../shared/services/category.service';
import {MessageModel} from '../../../shared/models/message.model';
import {fadeStateTrigger} from '../../../shared/animations/fade.animations';


@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss'],
    animations: [fadeStateTrigger]
})
export class EditCategoryComponent implements OnInit, OnDestroy {
    @Input() categories: CategoryModel[] = [];

    @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

    public currentCtegoryId = 1;
    public currentCategory: CategoryModel;
    public message: MessageModel;
    public sub1: Subscription;

    constructor(
        private categoriesService: CategoryService
    ) {
    }

    ngOnInit() {
        this.message = new MessageModel('success', '');
        this.onCategoryChange();
    }

    onSubmit(form: NgForm) {
        let {categoryValue, categoryName} = form.value;
        if (categoryValue < 0) {
            categoryValue *= -1;
        }
        const category = new CategoryModel(categoryName, categoryValue, this.currentCtegoryId);
        this.sub1 = this.categoriesService.updateCategory(category)
            .subscribe((c: CategoryModel) => {
                this.onCategoryEdit.emit(c);
                this.message.text = 'Категория успешно отредактирована.';
                window.setTimeout(() => this.message.text = '', 1500);
            });
    }

    onCategoryChange() {
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCtegoryId);
    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }
}

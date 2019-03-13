import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {CategoryModel} from '../models/category.model';
import {BaseApi} from '../../../shared/services/core/base-api';

@Injectable()
export class CategoryService extends BaseApi {
    constructor(
        public http: HttpClient,
    ) {
        super(http);
    }

    addCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.post('categories', category);
    }

    getCategoryes(): Observable<CategoryModel[]> {
        return this.get('categories');
    }

    updateCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryById(id: number): Observable<CategoryModel> {
        return this.get(`categories/${id}`);
    }
}

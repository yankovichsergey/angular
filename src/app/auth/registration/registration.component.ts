import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Meta, Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {UserService} from '../../shared/services/user.service';
import {UserModel} from '../../shared/models/user.model';


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    form: FormGroup;

    constructor(
        private  userService: UserService,
        private router: Router,
        private title: Title,
        private meta: Meta
    ) {
        title.setTitle('Регистрация в системе');
        meta.addTags([
            {name: 'description', content: 'Crm система по учету расходов и доходов.'},
            {name: 'keywords', content: 'Crm, Регистрация'}
        ]);
    }

    ngOnInit() {
        this.form = new FormGroup({
            'email': new FormControl(null, [
                    Validators.required,
                    Validators.email
                ],
                this.forbiddenEmail.bind(this)
            ),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            'name': new FormControl(null, [
                Validators.required,
            ]),
            'agree': new FormControl(false, [
                Validators.requiredTrue
            ]),
        });
    }

    onSubmit() {
        const {email, password, name} = this.form.value;
        const user = new UserModel(email, password, name);
        this.userService.createNewUser(user)
            .subscribe(() => {
                this.router.navigate(['/login'], {
                    queryParams: {
                        nowCanLogin: true
                    }
                });
            });
    }

    forbiddenEmail(control: FormControl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getUserByEmail(control.value)
                .subscribe((user: UserModel) => {
                    if (user) {
                        resolve({forbiddenEmail: true});
                    } else {
                        resolve(null);
                    }
                });
        });
    }

}

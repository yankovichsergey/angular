import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import {UserService} from '../../shared/services/user.service';
import {UserModel} from '../../shared/models/user.model';
import {MessageModel} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from '../../shared/animations/fade.animations';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public message: MessageModel;

    constructor(
        private userService: UserService,
        private authServise: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title,
        private meta: Meta
    ) {
        title.setTitle('Вход в систему');
        meta.addTags([
            {name: 'description', content: 'Crm система по учету расходов и доходов.'},
            {name: 'keywords', content: 'Crm, Логин, Вход'}
        ]);
    }

    ngOnInit() {
        this.message = new MessageModel('danger', '');
        this.form = new FormGroup({
            'email': new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
        });
        this.route.queryParams
            .subscribe((params: Params) => {
                if (params['nowCanLogin']) {
                    this.showMessage({
                        text: 'Теперь вы можете зайти в систему',
                        type: 'success'
                    });
                } else if (params['accessDenied']) {
                    this.showMessage({
                        text: 'Сперва неоходимо авторизоваться',
                        type: 'warning'
                    });
                }
            });

    }

    private showMessage(message: MessageModel) {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    onSubmit() {
        const formData = this.form.value;

        this.userService.getUserByEmail(formData.email)
            .subscribe((user: UserModel) => {
                if (user) {
                    if (user.password === formData.password) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authServise.login();
                        this.router.navigate(['/system', 'bill']);
                    } else {
                        this.showMessage({
                            text: 'Не верный пароль',
                            type: 'danger'
                        });
                    }
                } else {
                    this.showMessage({
                        text: 'Такого пользователя не существует',
                        type: 'danger'
                    });
                }
            });
    }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserModel} from '../../../../shared/models/user.model';
import {AuthService} from '../../../../shared/services/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public date: Date = new Date();

    public user: UserModel;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.user = JSON.parse(window.localStorage.getItem('user'));
    }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';
import { AppUser } from 'app/models/app-user';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

    appUser: AppUser;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.auth.appUser$.subscribe(appUser =>{console.log(appUser); this.appUser = appUser} );
    }

    logout() {
        this.auth.logout();
    }

}

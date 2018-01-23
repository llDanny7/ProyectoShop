import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/map'

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private auth: AuthService, private userService: UserService){

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        
            return this.auth.user$.switchMap( user => this.userService.get(user.uid)).
                    map(appUser => appUser.isAdmin);            
    }
}

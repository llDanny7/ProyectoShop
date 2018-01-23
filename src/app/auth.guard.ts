import { AuthService } from 'app/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router){

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            return this.auth.user$.map( user => {
                console.log("entra")
                if (user) return true;
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            })        
    }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth.service';
import { AppUser } from 'app/models/app-user';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { ShoppingCart } from 'app/models/shoppin-cart';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

    appUser: AppUser;
    isNavbarCollapsed: boolean;
    shoppingCartItemCount: number;
    cart$ : Observable<ShoppingCart>;
    constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
        this.isNavbarCollapsed = true;
     }

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser =>{console.log(appUser); this.appUser = appUser} );
        this.cart$ = await this.shoppingCartService.getCart();
    }

    logout() {
        this.auth.logout();
    }

}

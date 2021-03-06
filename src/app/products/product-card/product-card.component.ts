import { ShoppingCartService } from './../../shopping-cart.service';
import { Product } from './../../models/product';
import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() product:Product;
    @Input() showAction:boolean;
    @Input() shoppingCart: any;
    constructor(private cartService: ShoppingCartService) { }

    ngOnInit() {
    }

}

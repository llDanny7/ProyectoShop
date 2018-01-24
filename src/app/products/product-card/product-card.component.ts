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

    addToCart(){
        this.cartService.addToCart(this.product);
    }

    removeFromCart(){
        this.cartService.removeFromCart(this.product);
    }

    getQuantity(){
        if (!this.shoppingCart) return 0;

        let item = this.shoppingCart.itemsMap[this.product.$key];
        
        console.log(this.shoppingCart.items)
        return item ? item.quantity : 0;
    }
}

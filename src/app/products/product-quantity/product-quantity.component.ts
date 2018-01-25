import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'app/shopping-cart.service';
import { Product } from 'app/models/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

    @Input() product:Product;
    @Input() shoppingCart: any;
    constructor(private cartService: ShoppingCartService) { }

    ngOnInit() {
    }

    addToCart(){
        // console.log("Product",this.product)
        this.cartService.addToCart(this.product);
    }

    removeFromCart(){
        this.cartService.removeFromCart(this.product);
    }

    getQuantity(){
    
        return this.shoppingCart.getQuantityProduct(this.product);
    }

}

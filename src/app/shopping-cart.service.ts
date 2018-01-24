import { Product } from 'app/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take'

@Injectable()
export class ShoppingCartService {

    constructor(private database: AngularFireDatabase) {

    }

    private create() {
        return this.database.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        })
    }

    public async getCart() {
        let cartId = await this.getOrCreateCartId();
        return this.database.object('/shopping-carts/' + cartId);
    }
    private async getOrCreateCartId() {
        let cartId = localStorage.getItem('cartId');
        if (cartId) return cartId;
        let result = await this.create();
        localStorage.setItem('cartId', result.key);
        return result.key;
    }

    private getItem(cartId: string, productId: string){
        return this.database.object('/shopping-carts/'+cartId+'/items/'+productId);;
    }
    async addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    async removeFromCart(product: Product){
        this.updateItemQuantity(product, -1);
    }

    private async updateItemQuantity(product:Product, change: number){
        let cartId = await this.getOrCreateCartId();
        let itemCart$ = this.getItem(cartId, product.$key);
        itemCart$.take(1).subscribe( item => {
            itemCart$.update({ product: product, quantity: (item.quantity || 0) + change});
            
        })   
    }
}

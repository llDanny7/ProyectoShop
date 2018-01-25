import { Product } from 'app/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import { ShoppingCart } from 'app/models/shoppin-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

    constructor(private database: AngularFireDatabase) {

    }

    async clearShoppingCar(){
        let cartId = await this.getOrCreateCartId();
        this.database.object('/shopping-carts/'+cartId).remove();
    }

    private create() {
        return this.database.list('/shopping-carts').push({
            dateCreated: new Date().getTime()
        })
    }

    public async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.database.object('/shopping-carts/' + cartId).
                map (shoppingCart => new ShoppingCart(shoppingCart.items) );
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
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product){
        this.updateItem(product, -1);
    }

    private async updateItem(product:Product, change: number){
        console.log("update", product)
        let cartId = await this.getOrCreateCartId();
        let itemCart$ = this.getItem(cartId, product.$key);
        itemCart$.take(1).subscribe( item => {
            let quantity = (item.quantity || 0) + change
            if (quantity == 0) itemCart$.remove();
            else itemCart$.update({ 
                title: product.title,
                imageUrl: product.imageUrl,
                price: product.price
                , quantity: quantity });
            
        })   
    }
}

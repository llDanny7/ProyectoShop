import { Product } from 'app/models/product';
export class ShoppingCart {
    items:ShoppingCartItem[] = [];
    constructor(public itemsMap: {[key:string]:ShoppingCartItem }) {
         
        for (let productId in this.itemsMap) {
            this.items.push( new ShoppingCartItem(this.itemsMap[productId].product, this.itemsMap[productId].quantity) );
        }
    }

    get totalPrice(){
        let totalPrice = 0;
        for (let productId in this.items){
            totalPrice += this.items[productId].totalPrice;
        }
        return totalPrice
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}

export class ShoppingCartItem {

    constructor(public product:Product, public quantity: number ) {}

    get totalPrice() { return this.product.price * this.quantity}
}
import { Product } from 'app/models/product';
export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {}
        for (let productId in this.itemsMap) {
            let item = this.itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
        }
    }

    getQuantityProduct(product: Product){
        let item = this.itemsMap[product.$key];            
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let totalPrice = 0;
        for (let productId in this.items) {
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
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }
    get totalPrice() { return this.price * this.quantity }
}
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'app/models/product';
import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from 'app/category.service';
import 'rxjs/add/operator/switchMap'
import { ShoppingCartService } from 'app/shopping-cart.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

    categories$;
    categorySelected: string;
    products: Product[];
    productsFilter: Product[];
    subscribe: Subscription;
    shoppingCart: any;
    subscribeCart: Subscription;

    constructor(private route: ActivatedRoute,private productService: ProductService, 
                private categoryService: CategoryService, private shoppingCartService: ShoppingCartService) {
        this.subscribe = productService.getAll().
                            switchMap(products => {
                                console.log("entra por aqui")
                                this.productsFilter =  this.products = products
                                return route.queryParamMap;
                            }).subscribe( params =>{
                                this.categorySelected = params.get('category');
                                this.productsFilter = (this.categorySelected)?this.products.filter(product => product.category === this.categorySelected) : this.products;
                            } );

        this.categories$ = categoryService.getCategories();
    }

    async ngOnInit() {
        this.subscribeCart = (await  this.shoppingCartService.getCart()).subscribe( cart => {
            this.shoppingCart = cart;
        });
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe();
        this.subscribeCart.unsubscribe();
    }
}

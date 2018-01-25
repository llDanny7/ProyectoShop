import { ShoppingCart } from './../models/shoppin-cart';
import { Observable } from 'rxjs/Observable';
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
    
    categorySelected: string;
    products: Product[];
    productsFilter: Product[];
    subscribe: Subscription;
    shoppingCart$: Observable<ShoppingCart>;

    constructor(private route: ActivatedRoute, private productService: ProductService,
        private categoryService: CategoryService, private shoppingCartService: ShoppingCartService) {
     
    }

    async ngOnInit() {
        this.shoppingCart$ = await this.shoppingCartService.getCart();
        this.fillProdcut();
    }

    private fillProdcut(){
        this.subscribe = this.productService.
            getAll().
            switchMap(products => {
                this.productsFilter = this.products = products;                
                return this.route.queryParamMap;
            }).subscribe(params => {
                this.categorySelected = params.get('category');
                this.applyFilter(this.categorySelected);
            });   
    }

    private applyFilter(category: string){
        this.productsFilter = (category) ? this.products.filter(product => product.category === category) : this.products;
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe();    
    }
}

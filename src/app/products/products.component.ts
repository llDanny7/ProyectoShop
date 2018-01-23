import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'app/models/product';
import { Subscription } from 'rxjs/Subscription';
import { CategoryService } from 'app/category.service';
import 'rxjs/add/operator/switchMap'

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
    suscribe: Subscription;

    constructor(private route: ActivatedRoute,private productService: ProductService, private categoryService: CategoryService) {
        this.suscribe = productService.getAll().
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

    ngOnInit() {

    }

    ngOnDestroy(): void {
        this.suscribe.unsubscribe();
    }
}

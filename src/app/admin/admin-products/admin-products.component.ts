import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/models/product';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

    products: Product[];
    productsFilter: Product[];    
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getAll().subscribe(products => this.productsFilter = this.products = products);
    }

    filter(query:string){
        this.productsFilter = (query)?this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    }
}

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'app/category.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import 'rxjs/add/operator/take'
import { Product } from 'app/models/product';


@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

    title: FormControl;
    price: FormControl;
    category: FormControl;
    imageUrl: FormControl;

    formProduct: FormGroup;

    product:Product;
    id;

    public categories$;
    constructor(private categoryService: CategoryService, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
        this.categories$ = this.categoryService.getCategories();

        this.id = this.route.snapshot.paramMap.get('id');
        console.log(this.id)
        

    }

    ngOnInit() {


        this.title = new FormControl('', [Validators.required]);
        this.price = new FormControl('', [Validators.required]);
        this.category = new FormControl('', [Validators.required]);
        this.imageUrl = new FormControl('', [Validators.required]);

        this.formProduct = new FormGroup({
            title: this.title,
            price: this.price,
            category: this.category,
            imageUrl: this.imageUrl
        })
        if (this.id) this.productService.get(this.id).take(1).subscribe(product => {console.log(product); this.formProduct.setValue(product)} )
    }

    save() {
        if (this.id) this.productService.update(this.id, this.formProduct.value);
        else this.productService.create(this.formProduct.value);

        this.router.navigate(["/admin/products"])
    }

    delete() {
        if (!confirm("are you sure delete product?")) return;
        this.productService.delete(this.id)
        this.router.navigate(["/admin/products"])
    }

}
